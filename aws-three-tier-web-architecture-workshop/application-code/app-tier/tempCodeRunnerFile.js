// test-auth.js
const auth = require('./authService');  // adjust path as needed

// Test user details
const testUser = {
    login: 'testuser123',
    password: 'password123',
    email: 'test@example.com'
};

// Test registration
auth.registerUser(testUser.login, testUser.password, testUser.email)
    .then(result => {
        console.log('Registration Result:', result);
        
        // After successful registration, test login
        return auth.loginUser(testUser.login, testUser.password);
    })
    .then(result => {
        console.log('Login Result:', result);
        
        // Test wrong password
        return auth.loginUser(testUser.login, 'wrongpassword');
    })
    .then(result => {
        console.log('Login with wrong password Result:', result);
    })
    .catch(error => {
        console.error('Error:', error.message);
    })
    .finally(() => {
        // Close your database connection if needed
        process.exit();
    });