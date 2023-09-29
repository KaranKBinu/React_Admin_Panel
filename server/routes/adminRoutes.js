const express = require('express');
const { adminLogin, getUserData } = require('../controllers/adminController');

const router = express.Router();

// Admin login route
router.post('/admin/login', adminLogin);

// Get user data route
router.get('/getUserData', getUserData);

module.exports = router;
