const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()




const authRoutes = require('./routes/auth.route')
const postRoute = require('./routes/post.route')

app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use("/api/post", postRoute);


module.exports = app;