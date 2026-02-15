const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function Register(req, res) {
  const { username, email, password, bio, profileImage } = req.body;
  const isUserExist = await userModel.findOne({
    $or: [{ username }, { email }],
  });

  if (isUserExist) {
  return res.status(409).json({
    message:
      isUserExist.email === email
        ? "User already exists with this email"
        : "User already exists with this username",
  });
}


  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
    bio,
    profileImage,
  });

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "User register successfully",
    user,
    token,
  });
}

async function Login(req, res){
    const { username, email, password } = req.body
    
    const user = await userModel.findOne({
        $or: [
            { username },
            { email },
        ]
    });

    if (!user) {
        return res.status(404).json({
          message:
            email
              ? "User doesn't exist with this email"
              : "User doesn't exist with this username",
        });
    }

    const isPassword = bcrypt.compare(password, user.password)
    
    if (!isPassword) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.JWT_SECRET, { expiresIn: "7d" })
    
    res.cookie("token", token)

    res.status(200).json({
        message: "User Login successfully",
        user,
        token
    })
}




module.exports = {
  Register,
  Login,
};