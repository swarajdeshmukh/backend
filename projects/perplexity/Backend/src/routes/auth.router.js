// External imports
import { Router } from "express";

// Internal imports
import { registerValidator } from "../validator/auth.validator.js"; 
import { register } from "../controllers/auth.controller.js";
const authRouter = Router();


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 * @body {username, email, password}
 */
authRouter.post("/register", registerValidator, register);

export default authRouter;