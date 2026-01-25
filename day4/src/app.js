// Server create krna
// Server ko config. krna

const express = require("express")

//server create ho jata hai when ever we call express
const app = express() 

app.use(express.json())

const notes = []
// Home route
app.get("/", (req, res) => {
    res.send("Hello Guys!")
})

// note create 
app.post("/notes", (req, res) => {
    notes.push(req.body);
    console.log(req.body)
   res.send("Note has create") 
})

 
// note view
app.get("/notes", (req, res) => {
    res.send(notes)
})

// note delete
app.delete("/notes/:index", (req, res) => {
    delete notes[req.params.index];

    res.send("Notes delete succesfully")
})

// note update

app.patch("/notes/:index", (req, res) => {
    notes[req.params.index].title = req.body.title;
    notes[req.params.index].description = req.body.description;

    res.send("Note update succesfully")
})  

//export server from this file
module.exports = app