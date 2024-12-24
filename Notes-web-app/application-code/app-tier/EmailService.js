const nodemailer = require('nodemailer');
const authService = require('./AuthService'); // Ensure AuthService is imported correctly

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'my.notes.app.service@gmail.com',
        pass: '##helper' // Use an app-specific password if 2FA is enabled
    }
});

async function sendPasswordEmail(login) {
    try {
        const user = await authService.getUserByLogin(login);
        if (!user) {
            throw new Error('User not found');
        }

        const decryptedPassword = authService.decryptPassword(user.password);

        const mailOptions = {
            from: 'my.notes.app.service@gmail.com',
            to: user.email,
            subject: 'Your Password for My Notes App',
            text: `Hello ${user.login},\n\nYour password is: ${decryptedPassword}\n\nBest regards,\nMy Notes App Team`
        };

        await transporter.sendMail(mailOptions);
        console.log('Password email sent successfully');
    } catch (error) {
        console.error('Error sending password email:', error.message);
        throw error;
    }
}

module.exports = { sendPasswordEmail };
