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


async function getPostController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access",
    });
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (err) {
    return res.status(401).json({
      message: "Invalid Token"
    })
  }

  const userId = decoded.id;

  const posts = await postModel.find({
    user: userId
  })

  res.status(200).json({
    message: "All Post fetch successfully",
    posts
  })
}


async function getPostDetailsController(req, res) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized access"
    })
  }

  let decoded = null;

  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET)
  } catch (error) {
    res.status(401).json({
      message: "Invalid token"
    })
  }

  const userId = decoded.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found."
    })
  }

  const isValidUser = post.user.toString() === userId

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content."
    })
  }

  return res.status(200).json({
    message: "Post fetched successfully.",
    post
  })

}



module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};