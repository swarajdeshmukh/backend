const express = require('express');
const multer = require('multer');
const uploadeFile = require('./services/storage.service');
const postModel = require('./models/post.model');
const cors = require('cors');
const app = express();

app.use(cors())
// Middleware to parse JSON data
app.use(express.json());

//Middleware to parse URL-encoded data from forms
const upload = multer({ storage: multer.memoryStorage() });


app.get('/', (req, res) => {
    res.send('Welcome to the server!')
})

app.post("/create-post", upload.single("image"), async (req, res) => {
    const result = await uploadeFile(req.file.buffer)
    const post = postModel.create({
        image: result.url,
        caption: req.body.caption
    })

    console.log(result)
    console.log(req.body.caption);

    return res.status(201).json({
        message: "Post created successfully.",
        post: post
    }); 
});

app.get('/get-posts', async (req, res) => {
    const posts = await postModel.find()

    return res.status(200).json({
        posts: posts
    });
})


module.exports = app;