const mongoose = require('../utils/database'); // Updated import

const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    phone_number: String,
    email: String,
});

module.exports = mongoose.model('UserCRUD', userSchema);
