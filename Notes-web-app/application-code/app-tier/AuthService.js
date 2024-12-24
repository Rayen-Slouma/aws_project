const mysql = require('mysql');
const bcrypt = require('bcrypt');
const dbcreds = require('./DbConfig');

// Create a connection con instead of a single connection
const con = mysql.createConnection({
    host: dbcreds.DB_HOST,
    user: dbcreds.DB_USER,
    password: dbcreds.DB_PWD,
    database: dbcreds.DB_DATABASE
});


const registerUser = (login, password, email) => {
    return new Promise((resolve, reject) => {
        // Validate inputs
        if (!login || !password || !email) {
            return reject(new Error('Missing required fields'));
        }

        bcrypt.hash(password, 10)
            .then(hash => {
                const query = 'INSERT INTO user (login, password, email) VALUES (?, ?, ?)';
                con.query(query, [login, hash, email], (err, results) => {
                    if (err) {
                        // Handle duplicate entry errors specifically
                        if (err.code === 'ER_DUP_ENTRY') {
                            return reject(new Error('Username or email already exists'));
                        }
                        return reject(err);
                    }
                    resolve({
                        success: true,
                        userId: results.insertId
                    });
                });
            })
            .catch(err => reject(err));
    });
};

const loginUser = (login, password) => {
    return new Promise((resolve, reject) => {
        // Validate inputs
        if (!login || !password) {
            return reject(new Error('Missing login or password'));
        }

        const query = 'SELECT * FROM user WHERE login = ?';
        con.query(query, [login], (err, results) => {
            if (err) return reject(err);
            
            if (results.length === 0) {
                return resolve({ 
                    success: false, 
                    message: 'User not found' 
                });
            }

            const user = results[0];
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (isMatch) {
                        resolve({
                            success: true,
                            userId: user.id,
                            userEmail: user.email
                        });
                    } else {
                        resolve({
                            success: false,
                            message: 'Invalid password'
                        });
                    }
                })
                .catch(err => reject(err));
        });
    });
};

const getUserByLogin = (login) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT * FROM user WHERE login = ?';
        con.query(query, [login], (err, results) => {
            if (err) return reject(err);
            
            if (results.length === 0) {
                return resolve(null);
            }

            resolve(results[0]);
        });
    });
};

const decryptPassword = (hashedPassword) => {
    // Since bcrypt is a one-way hashing algorithm, we cannot decrypt the password.
    // Instead, we should store the plain text password securely and use it here.
    // For demonstration purposes, we will assume the plain text password is stored in the database.
    // In a real application, you should never store plain text passwords.
    return hashedPassword; // This is just a placeholder. Replace it with the actual plain text password.
};

module.exports = {
    registerUser,
    loginUser,
    getUserByLogin,
    decryptPassword
};