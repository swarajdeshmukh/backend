const express = require("express");
const postRouter = express.Router();

const postController = require("../controllers/post.controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require('../middleware/auth.middleware')

/**
 * POST /api/posts [protected]
 * - req.body = {caption, image-file}
 */
postRouter.post(
  "/",
  upload.single("imgUrl"),
  identifyUser,
  postController.createPostController,
);

/**
 * GET /api/posts [protected]
 * 
 */
postRouter.get("/", identifyUser, postController.getPostController);

/**
 * GET /api/posts/details/:postid [protected]
 * - return an detail about specific post with id. also check whether the post belong to the user that requset come from 
 */

postRouter.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailsController,
);


module.exports = postRouter;
