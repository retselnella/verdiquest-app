const mysql = require('mysql');
const bcrypt = require('bcrypt');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'verdiquest_db',
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
                const organizationId = 1;

                const insertQuery = 'INSERT INTO adminstrator (Username, Password, OrganizationId) VALUES (?, ?, ?)';
                connection.query(insertQuery, [username, hashedPassword, organizationId], (error, results) => {
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
        const query = `
        SELECT
            c.CoordinatorId,
            c.OrganizationId,
            c.PersonId,
            c.Rank,
            c.Username,
            c.Password,
            o.OrganizationName
        FROM
            coordinator c
        JOIN
            organization o ON c.OrganizationId = o.OrganizationId`;

        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
}; 

/**
 * Get the list of organizations
 * @returns {Promise} - A promise that resolves with the list of organizations
 */
exports.getOrganizationList = () => {
    return new Promise((resolve, reject) => {
      const query = 'SELECT OrganizationId, OrganizationName, OrganizationAddress, OrganizationType FROM Organization';
      
      connection.query(query, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  };

//add organization
exports.addOrganization = (organizationName, organizationAddress, organizationType) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO organization (OrganizationName, OrganizationAddress, OrganizationType) VALUES (?, ?, ?)';

        connection.query(query, [organizationName, organizationAddress, organizationType], (error, results) => {
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

exports.addTask = (taskDifficulty, organizationId, taskName, taskDescription, taskDuration, taskPoints, Status) => {
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO dailytask (DifficultyId, OrganizationId, TaskName, TaskDescription, TaskDuration, TaskPoints, Status) VALUES (?, ?, ?, ?, ?, ?, ?)';

        connection.query(query, [taskDifficulty, organizationId, taskName, taskDescription, taskDuration, taskPoints, Status], (error, results) => {
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
        const query = `
            SELECT 
                dt.*, 
                o.OrganizationName 
            FROM 
                dailytask dt
            JOIN 
                organization o ON dt.OrganizationId = o.OrganizationId
            WHERE 
                dt.isDeleted = false`;
                
        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.editTask = (id, taskName, taskDescription, taskDuration, taskPoints, taskDifficulty) => {
    return new Promise((resolve, reject) => {
        const query = 'UPDATE dailytask SET TaskName = ?, TaskDescription = ?, TaskDuration = ?, TaskPoints = ?, DifficultyId = ? WHERE TaskId = ?';
        
        connection.query(query, [taskName, taskDescription, taskDuration, taskPoints, taskDifficulty, id], (error, results) => {
            if (error) {                
                return reject(error);
            }
            resolve(results);
        });
    });
};

// exports.deleteTask = (id) => {
//     return new Promise((resolve, reject) => {
//         const query = 'DELETE FROM dailytask WHERE TaskId = ?';

//         connection.query(query, [id], (error, results) => {
//             if (error) {                
//                 return reject(error);
//             }
//             resolve(results);
//         });
//     });
// };

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

exports.getRevenue = () =>{
    return new Promise ((resolve,reject)=>{
        const query = 
        `SELECT SubscriptionId AS ID,YEAR(SubscriptionDate) AS Year, 
        MONTH(SubscriptionDate) AS Month, 
        SUM(SubscriptionCost) AS Revenue 
        FROM subscriptiontransaction 
        GROUP BY 
        YEAR(SubscriptionDate), 
        MONTH(SubscriptionDate) 
        ORDER BY Year, Month`;

        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    });
};

exports.getAge = ()=>{
    return new Promise ((resolve,reject)=>{
        const query = `SELECT 
        CASE 
            WHEN TIMESTAMPDIFF(YEAR, Birthdate, CURDATE()) < 12 THEN 'below 12'
            WHEN TIMESTAMPDIFF(YEAR, Birthdate, CURDATE()) BETWEEN 13 AND 20 THEN '13-20'
            WHEN TIMESTAMPDIFF(YEAR, Birthdate, CURDATE()) BETWEEN 21 AND 30 THEN '21-30'
            WHEN TIMESTAMPDIFF(YEAR, Birthdate, CURDATE()) BETWEEN 31 AND 50 THEN '31-50'
            ELSE '51 above'
        END AS age_range,
        COUNT(*) AS total_users
    FROM 
        person
    GROUP BY 
        age_range`;
        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    })
}

exports.getRegUser = ()=>{
    return new Promise ((resolve,reject)=>{
        const query = `SELECT DATE_FORMAT(DateRegistered, '%Y-%m') 
        AS Month, COUNT(*) AS TotalUser FROM user GROUP BY Month ORDER BY Month`;
        connection.query(query, (error, results) => {
            if (error) {
                return reject(error);
            }
            resolve(results);
        });
    })
}

exports.getTotalCompletedTask = () =>{
    return new Promise((resolve, reject) => {
        const query =
            `SELECT 
            DATE_FORMAT(DateFinished, '%Y-%m') AS month, 
            COUNT(*) AS total_completed_tasks 
            FROM userdailytask 
            WHERE status = 'completed' GROUP BY month ORDER BY month`;
        connection.query(query,(error,result)=>{
            if(error){
                return reject(error);
            }
            resolve(result);
        })
    })
}

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
        const query = 'INSERT INTO products (ProductId, ProductName, ProductDescription, ProductSize, ProductQuantity, PointsRequired) VALUES (?, ?, ?, ?, ?, ?)';
        connection.query(query, [productId, productName, productDescription, productSize, productQuantity, pointsRequired], (error, results) => {
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

  /**
 * Create a new person with default values
 * @param {string} UserId - User ID (can be null)
 * @param {string} FirstName - First name (empty string by default)
 * @param {string} LastName - Last name (empty string by default)
 * @param {string} Initial - Initial (empty string by default)
 * @param {string} Birthdate - Birthdate (empty string by default)
 * @param {string} PhoneNumber - Phone number (empty string by default)
 * @param {string} Gender - Gender (empty string by default)
 * @param {string} Street - Street (empty string by default)
 * @param {string} Barangay - Barangay (empty string by default)
 * @param {string} City - City (empty string by default)
 * @param {string} Province - Province (empty string by default)
 * @returns {Promise} - A promise that resolves with the result of the database query
 */
  exports.createPerson = (
    UserId = null,
    FirstName = '',
    LastName = '',
    Initial = '',
    Birthdate = '',
    PhoneNumber = '',
    Gender = '',
    Street = '',
    Barangay = '',
    City = '',
    Province = ''
  ) => {
    return new Promise((resolve, reject) => {
      const query = 'INSERT INTO Person (UserId, FirstName, LastName, Initial, Birthdate, PhoneNumber, Gender, Street, Barangay, City, Province) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
      const values = [UserId, FirstName, LastName, Initial, Birthdate, PhoneNumber, Gender, Street, Barangay, City, Province];
  
      connection.query(query, values, (error, results) => {
        if (error) {
          return reject(error);
        }
        resolve(results);
      });
    });
  };

    exports.addCoordinator = (OrganizationId, Rank, PersonId, Username, Password) => {
        return new Promise((resolve, reject) => {
            const query = 'INSERT INTO coordinator (OrganizationId, Rank, PersonId, Username, Password) VALUES (?, ?, ?, ?, ?)';

            connection.query(query, [OrganizationId, Rank, PersonId, Username, Password], (error, results) => {
                if (error) {
                    return reject(error);
                }
                resolve(results);
            });
        });
    };

   
