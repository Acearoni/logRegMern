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
}, {timestamps: true});

UserSchema.virtual('confirmPassword')
    .get(() => this._confirmPassword) 
    .set(value => this._confirmPassword = value)

UserSchema.pre('validate', function (next) {
    if(this.password !== this.confirmPassword){
        this.invalidate('confirmPassword', 'Passwords do not match')
    }
    next()
})

UserSchema.pre('save', function (next){
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash
            next()
        })
})

module.exports = mongoose.model('User', UserSchema)