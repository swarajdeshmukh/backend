const mongoose = require('mongoose');
 
//user Schema how user will look

const userSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
    },
    password: String
})

const userModel = mongoose.model('user', userSchema);
module.exports = userModel;