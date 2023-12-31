const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: String,
    name: String,
    email: String,
    phone: String,
    address: String,
    password: String,
});

module.exports = mongoose.model('User', userSchema);
