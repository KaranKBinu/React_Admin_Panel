const User = require('../models/UserCRUD');

// Create a new user
async function createUser(req, res) {
    const userData = req.body;
    try {
        const user = await User.create(userData);
        res.status(201).json(user);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Read all users
async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Read a user by ID
async function getUserById(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        console.error('Error fetching user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

async function updateUserById(req, res) {
    const userData = req.body; // Move this line up

    const userId = userData._id; // Now you can access userData._id

   

    try {
        // Rest of your update logic
        const user = await User.findByIdAndUpdate(userId, userData, {
            new: true,
        });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

// Delete a user by ID
async function deleteUserById(req, res) {
    const userId = req.params.id;
    try {
        const user = await User.findByIdAndRemove(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user by ID:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
};
