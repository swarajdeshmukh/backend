const postModel = require('../models/post.model')
const jwt = require('jsonwebtoken')
const uplodeImage = require('../services/imageKit.service')



async function createPostController(req, res) {
  const { caption } = req.body;
  const token = req.cookies.token

  if (!token) {
    return res.status(401).json({
      message: "Token not provided, Unauthorized access"
    })
  }
  let decode = null;
  
  try {
   decode = jwt.verify(token, process.env.JWT_SECRET);
    
  } catch (err) {
    return res.status(401).json({
      message: "User not authorized"
    })
  }

  const file = await uplodeImage(req.file.buffer);

  const post = await postModel.create({
    caption: caption,
    imgUrl: file.url,
    user: decode.id,
  });
  

  res.status(201).json({
    message: "Post created successfully",
    post
  })
}

module.exports = {createPostController};