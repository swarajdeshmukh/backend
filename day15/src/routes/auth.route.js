const express = require("express");
const authController = require('../controllers/auth.controller');

const authRouts = express.Router();

authRouts.post("/register", authController.Register);
authRouts.post("/login", authController.Login);

module.exports = authRouts;
