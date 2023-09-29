const User = require('../models/user');

// Function to handle admin login
async function adminLogin(req, res) {
    const { username, password } = req.body;

    try {
        const adminUser = await User.findOne({ username });

        if (!adminUser) {
            return res.status(401).json({ error: 'Admin login failed' });
        }

        // Compare the provided password with the hashed password stored in the database
        if (adminUser.password === password) {
            req.session.user = adminUser; // Store user data in the session
            res.status(200).json({ message: 'Admin login successful' });
        } else {
            res.status(401).json({ error: 'Admin login failed' });
        }
    } catch (error) {
        console.error('Error during admin login:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Function to fetch user data
async function getUserData(req, res) {
    try {

        const user = await User.findOne({ username: 'admin' });
        if (user) {
            res.json(user);
        } else {
            res.status(404).json({ error: 'User not found' });
        }
    } catch (error) {
        console.error('Error fetching user data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = { adminLogin, getUserData };
