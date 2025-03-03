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
                const userToken = jwt.sign({ id: newUser._id, email: newUser.email }, secretKey, { expiresIn: '2h' })
                // console.log(userToken)
                res.status(201).cookie('userToken', userToken, { httpOnly: true }).json(newUser)
            }
        }
        catch (err) {
            res.status(500).json({ error: err })
        }
    },
    loginUser: async (req, res) => {
        try {
            //Check if email matches
            const potentialUser = await User.findOne({ email: req.body.email })
            if (potentialUser) {
                //if it does, check if the password hash match
                const passwordsMatch = await bcrypt.compare(req.body.password, potentialUser.password)
                if (passwordsMatch) {
                    const userToken = jwt.sign({ id: potentialUser._id, email: potentialUser.email }, secretKey, { expiresIn: '2h' })
                    res.status(201).cookie('userToken', userToken, { httpOnly: true }).json(potentialUser)
                } else {
                    res.status(500).json({message: 'Invalid email / password'})
                }
            } else {
                res.status(500).json({message: 'invalid email / password'})
            }
        }
        catch (err) {
            res.status(500).json({ error: err })
            console.log(err)
        }
    },
    logoutUser: (req, res) => {
        res.clearCookie('userToken')
        res.status(200).json({message: 'User logged out'})
    }
}

// This below is same as the try{} const potentialUser
// User.findOne({email: req.body.email
//     .then((potentialUser) => {
//         res.json(potentialUser)
//     })
// })