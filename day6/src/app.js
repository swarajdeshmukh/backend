const express = require('express')

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcom to server!");
});

module.exports = app;