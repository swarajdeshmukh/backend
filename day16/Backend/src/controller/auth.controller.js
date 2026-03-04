const backlistModel = require("../models/blacklistToken.model");
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const redis = require('../config/cache')

async function registerController(req, res) {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const isUserExist = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserExist) {
      return res.status(409).json({
        message:
          isUserExist.email === email
            ? "User already exist with this email"
            : "User already exist with this username",
      });
    }

    const user = await userModel.create({
      email,
      username,
      password,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "3d",
      },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
}

async function loginController(req, res) {
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      return res.status(400).json({
        message: "Email/Username and password are required",
      });
    }

    const query = email ? { email } : { username };

    const user = await userModel.findOne(query).select("+password");

    if (!user) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "3d",
    });

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "User Login successful",
      user: {
        id: user._id,
        email: user.email,
        username: user.username,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

async function getMeController(req, res) {
  const userId = req.user.id;
  const user = await userModel.findById(userId)

  res.status(200).json({
    message: "User get successfully",
    user
  })
}

async function logoutController(req, res) {
  const token = req.cookies.token;

  res.clearCookie("token")

  await redis.set(token, Date.now().toString(), 'EX', 60*60)

  res.status(200).json({
    message: "Logged out successfully"
  })
  
}

module.exports = {
  registerController,
  loginController,
  getMeController,
  logoutController,
};
