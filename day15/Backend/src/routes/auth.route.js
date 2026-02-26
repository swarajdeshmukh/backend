const express = require("express");
const authRouts = express.Router();

const authController = require('../controllers/auth.controller');

authRouts.post("/register", authController.Register);
authRouts.post("/login", authController.Login);

module.exports = authRouts;
