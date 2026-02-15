const express = require("express");
const postRouter = express.Router();

const postController = require("../controllers/post.controller");

const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

/**
 * POST /api/posts [protected]
 * - req.body = {caption, image-file}
 */
postRouter.post("/", upload.single("imgUrl"), postController.createPostController);

/**
 * GET /api/posts [protected]
 * 
 */
postRouter.get("/", postController.getPostController)

/**
 * GET /api/posts/details/:postid [protected]
 * - return an detail about specific post with id. also check whether the post belong to the user that requset come from 
 */

postRouter.get("/details/:postId", postController.getPostDetailsController);


module.exports = postRouter;
