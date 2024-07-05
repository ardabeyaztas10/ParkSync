const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true 
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    userType: {
        type: String,
        enum: ['USER', 'ADMIN'],
        default: 'USER'
    },
    plate:{
        type: String,
        default: null
    }
})

module.exports = mongoose.model('User', userSchema);