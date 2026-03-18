import userModel from '../models/user.model.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';


import config from "../config/config.js";

export async function register(req, res) {
    const { username, email, password } = req.body;

    const isUserAlreadyRegister = await userModel.findOne({
        $or: [{username}, {email}]
    })

    if (isUserAlreadyRegister) {
      return res.status(409).json({
        message: "Username or email already exists",
      });
    }

    if (!password) {
        return res.status(400).json({
            message: "Password is required to register"
        })
    }

    const hashPassword = await bcrypt.hash(password, 10)
    console.log(hashPassword)

    const user = await userModel.create({
        username,
        email,
        password: hashPassword
    })

    const token = jwt.sign(
      {
        id: user._id,
      },
        config.JWT_SECRET, { expiresIn: '1d' });
    
    res.cookie('token', token)

    res.status(201).json({
        message: "User register successfully",
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        },
        token
    })
    
}

