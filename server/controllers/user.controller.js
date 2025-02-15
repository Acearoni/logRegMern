const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const secretKey = process.env.SECRET_KEY;

module.exports = {
    registerUser: async (req, res) => {
        try {
            //Check if the user exists
            const potentialUser = await User.findOne({ email: req.body.email })
            if (potentialUser) {
                res.status(400).json({ message: "This email already exists, please login" })
            }
            else {
                const newUser = await User.create(req.body)
                // console.log(newUser)
                //!GENERATE JSON WEBTOKEN!//
                const userToken = jwt.sign({id:newUser._id, email: newUser.email}, secretKey, {expiresIn: '2h'})
                // console.log(userToken)
                res.status(201).cookie('userToken', userToken, {httpOnly:true}).json(newUser)
            }
        }
        catch (err) {
            res.status(500).json({ error: err })
        }
    }
}

// This below is same as the try{} const potentialUser
// User.findOne({email: req.body.email
//     .then((potentialUser) => {
//         res.json(potentialUser)
//     })
// })