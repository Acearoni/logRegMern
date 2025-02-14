const User = require('../models/user.model');
const bcrypt = require('bcrypt');

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
                console.log(newUser)
                res.status(201).json(newUser)
            }
        }
        catch (err) {
            res.status(500).json({ error: err })
        }
        // This below is same as the try{} const potentialUser
        // User.findOne({email: req.body.email
        //     .then((potentialUser) => {
        //         res.json(potentialUser)
        //     })
        // })
    }
}