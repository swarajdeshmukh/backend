import jwt from "jsonwebtoken";

import userModel from "../models/user.model.js";
import { sendEmail } from "../services/mail.service.js";


export async function register(req, res) {
  try {
    const { username, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExists) {
      return res.status(409).json({
        message: "User with email or username already exists",
        success: false,
        err: "User already exists.",
      });
    }

    const user = await userModel.create({
      username,
      email,
      password,
    });

    const emailVerificationToken = jwt.sign(
      {
        email: user.email,
      },
      process.env.JWT_SECRET,
    );

    await sendEmail({
      to: email,
      subject: "Welcome to Perplexity!",
      text: `Hi ${username}, \n\nThank you for registering at Perplexity. We're excited to have you on Board!\n\nBest regards,\nThe Perplexity Team.`,
      html: `
                <p>Hi ${username},</p>
                <p>Thank you for registering at <strong>Perplexity</strong>. We're excited to have you on board!</p>
                <p>Please verify email by clicking the link below.</p>
                <a href="http://localhost:3000/api/auth/verify-email?token=${emailVerificationToken}">Verify Email </a>
                <p>Best regards,<br>The Perplexity Team</p>
        `,
    });

    res.status(201).json({
      message: "User registered successfully",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error faild to register",
      success: false,
      err: error.message
    });
  }
}

export async function verifyEmail(req, res) {

  try {
    const { token } = req.query;

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findOne({ email: decoded.email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "User not found",
      });
    }

    user.verified = true;

    await user.save();

    const html = `
    <h1>Email Verified Successfully</h1>
    <p>Your email has been verified. You can login to your account.</p>
    <a href="http://localhost:3000/api/auth/login">Go to Login </a>`;

    res.send(html);
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error faild to send email",
      success: false,
      err: error.message,
    });
  }
  
}


export async function login(req, res) {

  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({email})

    if (!user) {
      return res.status(400).json({
        message: "Unauthorized access",
        success: false,
        err: "User not found"
      })
    }

    const isPasswordMatch = await user.comparePassword(password);


    if (!isPasswordMatch) {
      return res.status(400).json({
        message: "Unauthorized access",
        success: false,
        err: "Incorrect password",
      });
    }

    if (!user.verified) {
      return res.status(400).json({
        message: "Please verify your email before logging in",
        success: false,
        err: "Email not verified"
      })
    }

    const token = jwt.sign({
      id: user._id,
      username: user.username,
      email: user.email
    }, process.env.JWT_SECRET, { expiresIn: '7d' })
    
    res.cookie("token", token)

    res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
      }
    })
    
  } catch (error) {
    return res.status(500).json({
      message: "Internal server error faild to Login",
      success: false,
      err: error.message,
    });
  }
}

export async function get_me(req, res) {
  try {
    const userId = req.user.id;

    const user = await userModel.findById(userId).select("-password");

    if (!user) {
      return res.status(400).json({
        message: "Invalid token",
        success: false,
        err: "User not found",
      });
    }

    res.status(200).json({
      message: "User fetched successfully",
      success: true,
      user
    })

  } catch (error) {
    return res.status(500).json({
      message: "Internal server error faild to fetch user details",
      success: false,
      err: error.message,
    });
  }
}