const express = require('express');
const userModel = require('../models/user.model')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const authRout = express.Router()

authRout.post('/register', async (req, res) => {
    const { name, email, password } = req.body;

    const isUserAllreadyExist = await  userModel.findOne({
        email
    })

    if (isUserAllreadyExist) {
        res.status(409).json({
            message: "User Allready Exist with this email."
        })
    }

    const  hash = crypto.createHash('md5').update(password).digest('hex')
    const user = await userModel.create({
        name,
        email,
        password: hash
    });

    const token = jwt.sign(
      {
        id: user._id,
      },
      process.env.JWT_SECREAT_KEY,
    );
    res.cookie('jwt_token', token)

    res.status(201).json({
        message: "User register succesfully.",
        user,
        token,
    })
})

authRout.post('/protected', (req, res) => {
    console.log(req.cookies)
    res.status(200).json({
        message:"This is a protected route"
    })
})

authRout.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await  userModel.findOne({
        email
    })

    if (!user) {
        res.status(404).json({
            message: "User with this email dose not exist"
        })
    }

    const isPasswordMatch = user.password === crypto.createHash('md5').update(password).digest('hex');

    if (!isPasswordMatch) {
        return res.status(401).json({
            message:"Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id, 

    }, process.env.JWT_SECREAT_KEY)

    res.cookie("jwt_token", token)

    res.status(200).json({
        message: "User logged in successfully",
        user,
        token
    })

})



module.exports = authRout;