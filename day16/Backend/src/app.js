const express = require('express');
const cookieparser = require('cookie-parser')

const app = express();


app.use(express.json());
app.use(cookieparser());

// Require routes
const authRouter = require('./routes/auth.routes')


// Use routes
app.use("/api/auth", authRouter);


module.exports = app;
