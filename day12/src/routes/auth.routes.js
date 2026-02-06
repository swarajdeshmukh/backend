const express = require('express')
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')

// express router is user for creating api other then app.js file
const authRouter = express.Router()


authRouter.post('/register', async(req, res) => {
    const { name, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email
    })

    if (isUserAlreadyExists) {
        return res.status(409).json({
            message: "User already exists"
        })
    }

    const user = await userModel.create({
      name,
      email,
      password,
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECREAT,
    );

    res.cookie("jwt_token", token)

    res.status(201).json({
        message: "User resistered successfully.",
        user,
        token
    })
})


module.exports = authRouter