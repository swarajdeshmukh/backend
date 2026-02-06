const express = require('express')
const cookiParser = require('cookie-parser')
const authRouter = require('../src/routes/auth.routes')

const app = express();


app.use(express.json())
app.use(cookiParser())


app.get('/', (req, res) => {
    res.send("Welcome to Server");
})

app.use('/api/auth', authRouter)

module.exports = app;