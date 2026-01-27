// Server ko create krna
// Server ko config. krna

const express = require("express")
const app = express();

const notes = []

app.use(express.json())

app.get("/", (req, res) => {
    res.send("Welcom to Server!")
})

// Notes creation
app.post("/notes", (req, res) => {
    notes.push(req.body);
    res.status(201).json({
        message: "Note Created Successfully."
    })
    // console.log(req.body)
})


// View notes
app.get("/notes", (req, res) => {
    res.status(200).json({
        "notes": notes
    })
})

//update notes
app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].description = req.body.description;
    
    res.status(200).json({
        message: "Note Updated Successfully."
    })
})

app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index];

    //Use code 204 for delete but response will not be visible on postman
    res.status(200).json({
        message : "Note Deleted Successfully."
    })
})


module.exports = app;