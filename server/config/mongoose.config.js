const mongoose = require('mongoose');

//! CHANGE THE NAME OF THE DATABASE TO WHAT YOU WANT IT TO BE!
mongoose.connect('mongodb://127.0.0.1:27017/loginReg')

    .then(() => console.log('Established a connection to the database'))
    .catch(() => console.log('Something went wrong when connecting to the database', err));