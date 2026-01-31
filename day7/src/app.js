const express = require('express');
const Note = require('../models/note');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
    res.send("Welcom to express server!")
})

app.post('/notes/create', async(req, res) => {
    const note = await Note.create(req.body)

    res.status(201).json({
        message: "Note created successfully",
        note: note
    })
})

app.get('/notes', async (req, res) => {
    const notes = await Note.find();

    res.status(200).json({
        message:"Notes data fetach succesfully!",
        notes: notes
    })
})

module.exports = app;