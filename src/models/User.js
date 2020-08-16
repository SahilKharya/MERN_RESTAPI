const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,  
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        validate: value =>{
            if(!validator.isEmail(value)){
                throw new Error({
                    error: "Invalid Email Address"
                });
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7
    },
})


userSchema.pre('save', function (next) {
    // Hash the password before saving the user model
    const user = this
    if (user.isModified('password')) {
        user.password = bcrypt.hashSync(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)

module.exports = User
