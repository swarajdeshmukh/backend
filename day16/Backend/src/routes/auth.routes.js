const express = require('express')
const authRouter = express.Router()
const identifyUser = require('../middleware/auth.middleware')

const authController = require('../controller/auth.controller')

authRouter.post("/register", authController.registerController);
authRouter.post("/login", authController.loginController);
authRouter.get("/getme", identifyUser, authController.getMeController);
authRouter.get("/logout", authController.logoutController)


module.exports = authRouter;