const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    username: String,
    googleId: String,
    thumbnail: String,
    role: {
        type: String,
        default: 'user'
    }
});

const User = module.exports = mongoose.model('User', UserSchema);
