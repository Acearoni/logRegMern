const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"],
        minLength: [3, "First name must be at least 3 characters long"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"],
        minLength: [3, "Last name must be at least 3 characters long"]
    },
    email: {
        type: String,
        required: [true, "An email is required"],
        validate: [isEmail, "Invalid email address"],
    },
    password: {
        type: String,
        required: [true, "A password is required"],
        minLength: [8, "Your password must be at least 8 characters long"]
    }
}, {timestamps: true})

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword) 
    .set(value => this._confirmPassword = value)   