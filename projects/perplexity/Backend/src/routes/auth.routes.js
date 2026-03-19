// External imports
import { Router } from "express";

// Internal imports
import { loginValidator, registerValidator } from "../validator/auth.validator.js"; 
import { get_me, login, register, verifyEmail } from "../controllers/auth.controller.js";
import { authUser } from "../middleware/auth.middleware.js";
const authRouter = Router();


/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 * @body {username, email, password}
 */
authRouter.post("/register", registerValidator, register);


/**
 * @route GET /api/auth/verify-email
 * @description Verify user's email address
 * @access Public
 * @query {token}
 */
authRouter.get("/verify-email", verifyEmail);


/**
 * @route POST/api/auth/login
 * @description Login a user
 * @access Public
 * @body {email, password}
 */
authRouter.post("/login", loginValidator, login);

/**
 * @route GET/api/auth/get-me
 * @description Fetch user details
 * @access private
 */
authRouter.get("/get-me",authUser, get_me);

export default authRouter;