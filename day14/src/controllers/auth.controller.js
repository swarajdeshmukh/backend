const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcryptjs')

exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const isUserAlreadyExist = await userModel.findOne({
      email,
    });

    if (isUserAlreadyExist) {
      return res.status(409).json({
        message: "User already exist with this email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
    );

    res.cookie("jwt_token", token);

    res.status(201).json({
      message: "User register successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "Registration failed",
      error: error.message,
    });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User with this email does not exist",
      });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({
        message: "Invalid Password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECRET_KEY,
    );

    res.cookie("jwt_token", token);

    res.status(200).json({
      message: "User Login successfully",
      user,
      token,
    });
  } catch (error) {
    res.status(500).json({
      message: "User Login failed.",
      error: error.message,
    });
  }
};
