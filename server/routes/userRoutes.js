const express = require('express');
const {
    createUser,
    getAllUsers,
    getUserById,
    updateUserById,
    deleteUserById,
} = require('../controllers/userController');

const router = express.Router();

// Create a new user
router.post('/', createUser);

// Read all users
router.get('/', getAllUsers);

// Read a user by ID
router.get('/:id', getUserById);

// Update a user by ID
router.put('/:id', updateUserById); // Check that the route parameter name is ":id"


// Delete a user by ID
router.delete('/:id', deleteUserById);

module.exports = router;
