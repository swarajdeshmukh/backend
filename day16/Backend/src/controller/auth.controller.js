const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

async function register(req, res) {
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

async function login(req, res) {
  try {
    const { email, username, password } = req.body;

    if ((!email && !username) || !password) {
      return res.status(400).json({
        message: "Email/Username and password are required",
      });
    }

    const user = await userModel
      .findOne({
        $or: [{ email }, { username }],
      })
      .select("+password");

    if (!user) {
      return res.status(404).json({
        message: "User not found",
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

    res.cookie("token", token);

    res.status(200).json({
      message: "User Login successful",
      token,
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

module.exports = {
  register,
  login,
};
