const userModel = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function registerController(req, res) {
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
      username: user.username
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

async function loginController(req, res){
    const { username, email, password } = req.body
    
    const user = await userModel.findOne({
        $or: [
            { username },
            { email },
        ]
    }).select('+password');

    if (!user) {
        return res.status(404).json({
          message:
            email
              ? "User doesn't exist with this email"
              : "User doesn't exist with this username",
        });
    }

    const isPassword = await bcrypt.compare(password, user.password)
    
    if (!isPassword) {
        return res.status(401).json({
            message: "Invalid password"
        })
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );
    
    res.cookie("token", token)

    res.status(200).json({
        message: "User Login successfully",
        user,
        token
    })
}


async function getMeController(req, res) {
  const userId = req.user.id;

  const user = await userModel.findById(userId)

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage
    }
  })

}



module.exports = {
  registerController,
  loginController,
  getMeController,
};