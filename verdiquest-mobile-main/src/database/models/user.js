const BaseModel = require("./BaseModel");
const bcrypt = require("bcrypt");

class User extends BaseModel {
    constructor(db) {
        // Accept the 'db' object as a parameter
        super("user");
        this.db = db; // Assign the 'db' object to the instance variable
    }

    async insertUser(userData) {
        try {
        const formatDate = (date) => {
            return date.toISOString().slice(0, 10);
        };

        const [result] = await this.db.query(
            `INSERT INTO ${this.tableName} (SubscriptionStatus, VerdiPoints, Email, Password, ProfilePicture, TaskCount, DateRegistered, LastActive) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
            [
            "Inactive",
            0,
            userData.email,
            userData.password,
            "",
            0,
            formatDate(new Date()),
            formatDate(new Date()),
            ]
        );
        const insertedId = result.insertId;

        const [person] = await this.db.query(
            "INSERT INTO person (UserId, FirstName, LastName, Initial,  Birthdate, PhoneNumber, Gender, Street, Barangay, City, Province) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
            [
            insertedId,
            userData.firstName,
            userData.lastName,
            userData.middleInitial,
            userData.birthDate,
            userData.phoneNumber,
            userData.gender,
            userData.street,
            userData.barangay,
            userData.city,
            userData.province,
            ]
        );
        return insertedId;
        } catch (error) {
        console.error(`Error inserting user`, error);
        throw error;
        }
    }

    async fetchUser(userData) {
        try {
        // Fetch the user by email
        const [result] = await this.db.query(
            "SELECT * FROM user WHERE email = ?",
            [userData.email]
        );
        const user = result[0];

        if (!user) {
            return null;
        }

        if (userData.password) {
            try {
            const isPasswordValid = await bcrypt.compare(
                userData.password,
                user.Password
            );

            if (isPasswordValid) {
                return user;
            } else {
                return null;
            }
            } catch (error) {
            return error;
            }
        } else {
            return user;
        }
        } catch (error) {
        console.error(`Error fetching user`, error);
        throw error;
        }
    }

    async updateUser(userData) {
        try {
        const [user] = await this.db.query(
            "UPDATE user SET VerdiPoints = VerdiPoints + ?, password = ? WHERE UserId = ?",
            [userData.verdiPoints, userData.password, userData.userId]
        );

        const userUpdate = user.affectedRows;
        return userUpdate;
        } catch (error) {
        console.error(`Error updating user: ${error}`);
        throw error;
        }
    }
    async fetchTasks() {
        try {
            const [result] = await this.db.query(
                "SELECT * FROM dailytask WHERE isDeleted = 0"
            );
            return result.length > 0 ? result : [];
        } catch (error) {
            console.error(`Error fetching tasks: ${error}`);
            throw error;
        }
    }

    async fetchEasyTask (){
        try {
            const [result] = await this.db.query("SELECT * FROM dailytask WHERE DifficultyId = 1");
            return result.length > 0 ? result : [];
        } catch (error) {
            console.error(`Error fetching easy tasks: ${error}`);
            throw error;
        };
    }

    async fetchNormalTask (){
        try {
            const [result] = await this.db.query("SELECT * FROM dailytask WHERE DifficultyId = 2");
            return result.length > 0 ? result : [];
        } catch (error) {
            console.error(`Error fetching easy tasks: ${error}`);
            throw error;
        };
    }

    async fetchHardTask (){
        try {
            const [result] = await this.db.query("SELECT * FROM dailytask WHERE DifficultyId = 3");
            return result.length > 0 ? result : [];
        } catch (error) {
            console.error(`Error fetching easy tasks: ${error}`);
            throw error;
        };
    }

    async fetchTaskDetails(taskId) {
        try {
            const [result] = await this.db.query(
                "SELECT * FROM dailytask WHERE TaskId = ?", [taskId]
            );
            return result[0];
        } catch (error) {
            console.error(`Error fetching task details: ${error}`);
            throw error;
        }
    }

    async fetchAllDifficultyTasks() {
        try {
            const [result] = await this.db.query(
                "SELECT * FROM dailytask WHERE isDeleted = 0 ORDER BY DifficultyId ASC"
            );
            return result.length > 0 ? result : [];
        } catch (error) {
            console.error(`Error fetching all tasks: ${error}`);
            throw error;
        }
    }


    async acceptTask(userId, taskId, dateTaken) {
        // Check if the task is already accepted by the user
        const checkQuery = `SELECT * FROM userdailytask WHERE UserId = ? AND TaskId = ?`;
        const [existingTasks] = await this.db.query(checkQuery, [userId, taskId]);
    
        if (existingTasks.length > 0) {
            // Task is already accepted
            return { alreadyAccepted: true };
        }
    
        try {
            // Start a transaction
            await this.db.query('START TRANSACTION');
    
            // If not accepted, insert the task
            const insertQuery = `
                INSERT INTO userdailytask (UserId, TaskId, DateTaken, Status) 
                VALUES (?, ?, ?, 'Ongoing')
            `;
            await this.db.query(insertQuery, [userId, taskId, dateTaken]);
    
            // Update TaskCount in user table
            const updateTaskCountQuery = `
                UPDATE user 
                SET TaskCount = TaskCount + 1 
                WHERE UserId = ?
            `;
            await this.db.query(updateTaskCountQuery, [userId]);
    
            // Commit the transaction
            await this.db.query('COMMIT');
    
            return { result: "Task Accepted", alreadyAccepted: false };
        } catch (error) {
            // If an error occurs, rollback the transaction
            await this.db.query('ROLLBACK');
            throw error;
        }
    }
    
    

    async checkTaskAccepted(userId, taskId) {
        const query = "SELECT * FROM userdailytask WHERE UserId = ? AND TaskId = ? AND Status = 'Ongoing'";
        const [results] = await this.db.query(query, [userId, taskId]);
        return results.length > 0; // true if task is accepted
    }

    async fetchAcceptedTasks(userId) {
        const query = `
            SELECT udt.*, dt.TaskName, dt.DifficultyId, dt.TaskDescription, dt.TaskPoints
            FROM userdailytask udt
            JOIN dailytask dt ON udt.TaskId = dt.TaskId
            WHERE udt.UserId = ? AND udt.Status = 'Ongoing'
        `;
        const [tasks] = await this.db.query(query, [userId]);
        return tasks;
    }

    async removeFromUserDailyTask(userId, taskId) {
        // Check if the task exists in the user's daily tasks
        const checkQuery = `SELECT * FROM userdailytask WHERE UserId = ? AND TaskId = ?`;
        const [existingTasks] = await this.db.query(checkQuery, [userId, taskId]);
    
        if (existingTasks.length === 0) {
            // Task is not in the user's daily tasks
            return { error: "Task not found in user's daily tasks", taskRemoved: false };
        }
    
        // If the task is found, proceed to delete it
        const deleteQuery = `DELETE FROM userdailytask WHERE UserId = ? AND TaskId = ?`;
        await this.db.query(deleteQuery, [userId, taskId]);
    
        // Return a successful response
        return { message: "Task successfully removed from user's daily tasks", taskRemoved: true };
    }
    
    
    async getVerdiPoints(userId) {
        const query = `SELECT VerdiPoints FROM user WHERE UserId = ?`;
        try {
            const result = await this.db.query(query, [userId]);
            return result[0][0].VerdiPoints; 
        } catch (error) {
            throw error;
        }
    }

    async fetchAllOrganizations(){
        const query = `SELECT * FROM organization`;
        try {
            const [rows] = await this.db.execute(query);
            return rows;
        } catch (error) {
            throw new Error('Error fetching organizations: ' + error.message);
        }
    }

    async getOrganizationDetails(organizationId) {
        const query = 'SELECT * FROM organization WHERE OrganizationId = ?';
        try {
            const [rows] = await this.db.execute(query, [organizationId]);
            return rows.length > 0 ? rows[0] : null;
        } catch (error) {
            throw new Error('Error fetching organization details: ' + error.message);
        }
    }

    async updateUserOrganization(userId, organizationId) {
        const query = 'UPDATE user SET OrganizationId = ? WHERE UserId = ?';
        try {
            const [result] = await this.db.execute(query, [organizationId, userId]);
            return result;
        } catch (error) {
            throw new Error('Error updating user organization: ' + error.message);
        }
    }

    async isMember(userId, organizationId) {
        const query = 'SELECT COUNT(*) AS memberCount FROM user WHERE UserId = ? AND OrganizationId = ?';
        try {
            const [rows] = await this.db.execute(query, [userId, organizationId]);
            return rows[0].memberCount > 0;
        } catch (error) {
            throw new Error('Error checking membership: ' + error.message);
        }
    }

    async getTasksByOrganization(organizationId) {
        const query = 'SELECT * FROM dailytask WHERE OrganizationId = ?';
        try {
            const [tasks] = await this.db.execute(query, [organizationId]);
            return tasks;
        } catch (error) {
            throw new Error('Error fetching tasks: ' + error.message);
        }
    }

    async fetchEventsByOrganization(organizationId) {
        const query = 'SELECT * FROM event WHERE OrganizationId = ?';
        try{
            const [events] = await this.db.query(query, [organizationId]);
            return events;
        } catch(error) {
            throw new Error('Error fetching events' + error.message);
        }
    }

    async fetchEventById(eventId) {
        const query = 'SELECT * FROM event WHERE EventId = ?';
        try{
            const [event] = await this.db.query(query, [eventId]);
            return event[0];
        }catch(error){
            throw new Error('Error fetching event id '+error.message);
        }
    }

    async fetchProducts() {
        try {
            const query = 'SELECT ProductName, ProductDescription, PointsRequired FROM products';
            const [products] = await this.db.query(query);
            return products;
        } catch (error) {
            throw new Error('Error fetching products: ' + error.message);
        }
    }
    
}

module.exports = User;
