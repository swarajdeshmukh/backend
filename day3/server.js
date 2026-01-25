const express = require('express')
const app = express()
const PORT = 3000;

// Middleware
app.use(express.json())

const notes = [];

app.get("/", (req, res) => {
  res.send("Home page");
});

app.post("/notes", (req, res) => {
    console.log(req.body)
    notes.push(req.body)
    res.send("Note created")
})

app.get("/notes", (req, res) => {
    res.send(notes)
})


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`)
})