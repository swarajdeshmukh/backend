const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()


app.use(express.json())
app.use(cookieParser())

// Require routes
const authRoutes = require('./routes/auth.route')
const postRoute = require('./routes/post.route')
const userRouter = require('./routes/user.route')

// Use routes
app.use('/api/auth', authRoutes)
app.use("/api/post", postRoute);
app.use("/api/users", userRouter);


module.exports = app;