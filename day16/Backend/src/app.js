const express = require('express');
const cookieparser = require('cookie-parser')
const cors = require('cors')
const app = express();


app.use(express.json());
app.use(cookieparser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:5173'
}))

// Require routes
const authRouter = require('./routes/auth.routes')


// Use routes
app.use("/api/auth", authRouter);


module.exports = app;
