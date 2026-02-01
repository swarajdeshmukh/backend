const express = require('express');
const noteModel = require("./models/note.model");
const cors = require('cors');

const app = express();
app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send("Welcome to server!")
})


// Create a Note
app.post('/api/notes/create', async (req, res) => {
    // My code
    // const note = await noteModel.create(req.body);
    // res.status(201).json({
    //     message: "Note created successfully!",
    //     note
    // })

    // Sir code
    const { title, discription } = req.body;
    const note = await noteModel.create({ title, discription });
    res.status(201).json({
      message: "Note created successfully!",
      note,
    });

})


// Get all notes
app.get('/api/notes', async(req, res) => {
    const notes = await noteModel.find();

    res.status(200).json({
        message: 'Notes featched successfully!',
        notes
    })
})

// Delete a note
app.delete('/api/note/:id', async(req, res) => {
    const {id} = req.params;

    const note = await noteModel.findByIdAndDelete(id);

    res.status(200).json({
        message: "Note deleted successfully!",
        note
    })
})


//Update a note
/**?
 * Patch /api/note/:id
 * update the discription of the note with given id
 * request body: {discription: "new discription"}
 */

app.patch('/api/note/update/:id', async(req, res) => {
    const { id } = req.params;
    const { discription } = req.body;
    const note = await noteModel.findByIdAndUpdate(id, { discription })
    
    res.status(200).json({
        message: "Note updated successfully!",
        note
    })
})


module.exports = app;

