const mongoose = require('mongoose')

const blacklistSchema = new mongoose.Schema({
    token:{
        type: String,
        require: [true, "Token require for Token Blacklisting"]
    }
}, { timestamps: true })

const backlistModel = mongoose.model("Backlist", blacklistSchema);

module.exports = backlistModel;