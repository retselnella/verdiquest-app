const mysql = require('mysql');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'verdiquest',
});

exports.checkAdminCredentials = (username, password) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM adminstrator WHERE Username = ?';
        connection.query(query, [username], async (error, results) => {
            if (error) {
                return reject(error);
            }

            const admin = results[0];
            if (!admin) {
                return resolve(null);
            }

            if (password) {
                try {
                    const isPasswordValid = await bcrypt.compare(password, admin.Password);
                    return resolve(isPasswordValid ? admin : null);
                } catch (error) {
                    return reject(error);
                }
            } else {
                return resolve(admin);
            }
        });
    });
};



exports.createAdmin = (username, password) => {
    return new Promise(async (resolve, reject) => {
        const checkQuery = 'SELECT * FROM adminstrator WHERE Username = ?';
        connection.query(checkQuery, [username], async (error, results) => {
            if (error) {
                return reject(error);
            }
            if (results.length > 0) {
                return reject(new Error('Username already exists'));
            }

            try {
                const hashedPassword = await bcrypt.hash(password, 14);
                const insertQuery = 'INSERT INTO adminstrator (Username, Password, OrganizationId) VALUES (?, ?, 1)';
                connection.query(insertQuery, [username, hashedPassword], (error, results) => {
                    if (error) {
                        return reject(error);
                    }
                    resolve(results);
                });
            } catch (error) {
                reject(error);
            }
        });
    });
};



exports.getUserCredential = (searchTerm = '', filter = '') => {
    return new Promise((resolve, reject) => {
        let query = `
            SELECT 
                u.UserId AS 'ID',
                u.SubscriptionStatus AS 'Subscription',
                u.VerdiPoints AS 'Points',
                u.Email AS 'Email',
                u.ProfilePicture AS 'Profile',
                u.TaskCount AS 'Task',
                u.DateRegistered AS 'Registered',
                u.LastActive AS 'Last Active',
                CONCAT(p.FirstName, ' ', p.Initial, ' ', p.LastName) AS 'Name',
                p.Birthdate AS 'DOB',
                p.PhoneNumber AS 'Phone',
                p.Gender AS 'Gender',
                CONCAT(p.Street, ', ', p.Barangay, ', ', p.City, ', ', p.Province) AS 'Address',
                p.UpdateAt AS 'Updated'
            FROM 
                user u
            JOIN 
                person p ON u.UserId = p.UserId
            WHERE 
                CONCAT(p.FirstName, ' ', p.Initial, ' ', p.LastName) LIKE ?
        `;

        let parameters = [`%${searchTerm}%`];

        if (filter) {
            query += ' AND u.SubscriptionStatus = ?';
            parameters.push(filter);
        }

        connection.query(query, parameters, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};


exports.getCoordinatorList = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM coordinator`;

        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getOrganizationList = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM organization`;

        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getSubscriberList = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM subscription`;

        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getEvents = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM event`;

        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};
exports.addTask = (taskName, taskDescription, taskPoints, taskDifficulty) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO dailytask (TaskName, TaskDescription, TaskPoints, DifficultyId, Status) VALUES (?, ?, ?, ?, ?)';
        const difficultyId = taskDifficulty;
        const status = 'Active';

        connection.query(query, [taskName, taskDescription, taskPoints, difficultyId, status], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.markTaskAsInactive = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE dailytask SET Status = "Inactive" WHERE TaskId = ?';

        connection.query(query, [id], (error, results) => {
            if (error) {                
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getTasks = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM dailytask WHERE isDeleted = false`;
        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.editTask = (id, taskName, taskDescription, taskPoints, taskDifficulty) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE dailytask SET TaskName = ?, TaskDescription = ?, TaskPoints = ?, DifficultyId = ? WHERE TaskId = ?';
        
        connection.query(query, [taskName, taskDescription, taskPoints, taskDifficulty, id], (error, results) => {
            if (error) {                
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.softDeleteTask = (id) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE dailytask SET isDeleted = 1 WHERE TaskId = ?';

        connection.query(query, [id], (error, results) => {
            if (error) {                
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getCountUser = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) FROM user`;

        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getCountCoordinator = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) FROM coordinator`;

        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getCountOrganization = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) FROM organization`;

        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getCountSubscriber = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) FROM subscription`;

        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.addTask = (taskName, taskDescription, taskPoints, taskDifficulty) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO dailytask (TaskName, TaskDescription, TaskPoints, DifficultyId, Status) VALUES (?, ?, ?, ?, ?)';
        const difficultyId = taskDifficulty; 
        const status = 'Active'; 
        
        connection.query(query, [taskName, taskDescription, taskPoints, difficultyId, status], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};


exports.getTasks = () => {
    return new Promise((resolve, reject) => {
        const query = `SELECT * FROM dailytask WHERE isDeleted = false`;
        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getTotalParticipants =() =>{
    return new Promise ((resolve,reject)=>{
        const query = 
        `SELECT 
            e.EventId AS EventId, 
            e.EventName AS EventName,
            e.EventDate AS EventDate,
            e.EventStatus AS Status, 
            COUNT(p.EventId) AS Count
            FROM 
                event e 
            JOIN 
                participants p ON e.EventId = p.EventId 
            GROUP BY 
                e.EventId, e.EventName`;

        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getParticipants = (id) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT 
                p.ParticipantId,
                o.OrganizationName,
                u.Email,
                p.Status,
                p.Feedback,
                e.EventName 
            FROM 
                participants p
            JOIN 
                organization o ON p.OrganizationId = o.OrganizationId
            JOIN 
                user u ON p.UserId = u.UserId
            JOIN 
                event e ON p.EventId = e.EventId 
            WHERE 
                p.EventId = ?`;
        connection.query(query, [id], (err, result) => {
            if (err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

exports.getTaskNameById = (taskId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT TaskName 
            FROM dailytask 
            WHERE TaskId = ?`;

        connection.query(query, [taskId], (error, results) => {
            if (error) {
                return reject(error);
            }
            if(results.length > 0) {
                resolve(results[0].TaskName);
            } else {
                resolve(null);
            }
        });
    });
};

exports.getParticipantsForTask = (taskId) => {
    return new Promise((resolve, reject) => {
        const query = `
            SELECT u.UserId, u.Email, t.TaskName, ud.Status 
            FROM user u 
            JOIN userdailytask ud ON u.UserId = ud.UserId 
            JOIN dailytask t ON t.TaskId = ud.TaskId 
            WHERE t.TaskId = ?`;

        connection.query(query, [taskId], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.addProduct = (productId, productName, productDescription, productSize, productQuantity, pointsRequired) => {
    return new Promise((resolve, reject) => {
        const organizationId = 1;
        const query = 'INSERT INTO products (ProductId, OrganizationId, ProductName, ProductDescription, ProductSize, ProductQuantity, PointsRequired) VALUES (?, ?, ?, ?, ?, ?, ?)';
        connection.query(query, [productId, organizationId, productName, productDescription, productSize, productQuantity, pointsRequired], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getRewards = () => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM products';
        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.editReward = (productId, productName, productDescription, productSize, productQuantity, pointsRequired) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE products SET ProductName = ?, ProductDescription = ?, ProductSize = ?, ProductQuantity = ?, PointsRequired = ? WHERE ProductId = ?';
        connection.query(query, [productName, productDescription, productSize, productQuantity, pointsRequired, productId], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.deleteReward = (productId) => {
    return new Promise((resolve, reject) => {
        const query = 'DELETE FROM products WHERE ProductId = ?';
        connection.query(query, [productId], (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};
