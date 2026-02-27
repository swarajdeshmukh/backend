const express = require("express");
const authRouts = express.Router();

const identifyUser = require('../middleware/auth.middleware')

const authController = require('../controllers/auth.controller');

authRouts.post("/register", authController.registerController);
authRouts.post("/login", authController.loginController);
authRouts.get("/get-me", identifyUser, authController.getMeController);

module.exports = authRouts;
