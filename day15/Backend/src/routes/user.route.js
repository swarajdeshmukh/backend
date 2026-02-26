const express = require('express');
const userController = require('../controllers/user.controller')
const identifyUser = require('../middleware/auth.middleware')
const userRouter = express.Router();

/**
 * @route POST /api/users/follow/:userid
 * @description Follow a user
 * @access Private
 */
userRouter.post(
  "/follow/:username",
  identifyUser,
  userController.sendFollowRequestController,
);


userRouter.get(
  "/follow/requests",
  identifyUser,
  userController.getFollowRequestsController,
);

userRouter.patch(
  "/follow/request/:requestId",
  identifyUser,
  userController.updateFollowRequestController,
);

/**
 * @route POST /api/users/unfollow/:userid
 * @description unFollow a user
 * @access Private
 */


module.exports = userRouter;