const likeModel = require("../models/like.model");
const postModel = require("../models/post.model");
const uplodeImage = require("../services/imageKit.service");

async function createPostController(req, res) {
  const { caption } = req.body;

  // uploade Image function is imageKit servise function
  const file = await uplodeImage(req.file.buffer);

  const post = await postModel.create({
    caption: caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  console.log(req.user);
  const userId = req.user.id;

  const posts = await postModel.find({
    user: userId,
  });

  res.status(200).json({
    message: "All Post fetch successfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const userId = req.user.id;
  const postId = req.params.postId;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found.",
    });
  }

  const isValidUser = post.user.toString() === userId;

  if (!isValidUser) {
    return res.status(403).json({
      message: "Forbidden Content.",
    });
  }

  return res.status(200).json({
    message: "Post fetched successfully.",
    post,
  });
}

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postId;
  console.log(req.params.postId);

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({
      message: "Post not found",
    });
  }

  const like = await likeModel.create({
    post: postId,
    user: username,
  });

  res.status(200).json({
    message: "Post liked successfully.",
    like,
  });
}

async function getFeedController(req, res) {
  const user = req.user
  const posts = await Promise.all(
    (await postModel.find().populate("user").lean()).map(async (post) => {

      const isLiked = await likeModel.findOne(
        {
          user: user.username,
          post: post._id
        }
      )
      post.isLiked = !!isLiked;
       
      return post
    }),
  );



  res.status(200).json({
    message: "Posts fetched successfully.",
    posts,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  getFeedController,
};
