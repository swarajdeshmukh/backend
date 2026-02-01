const mongoose = require('mongoose');

const noteSchema = new mongoose.Schema({
    title: String,
    discription: String
});

const noteModel = mongoose.model('Note', noteSchema);

module.exports = noteModel;