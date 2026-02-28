const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "Username already exist"],
    require: [true, "Username is required"],
  },
  email: {
    type: String,
    unique: [true, "User with this email already exist"],
    require: [true, "Email is required"],
  },
  password: {
    type: String,
    require: [true, "Password is required"],
    select:false
  },
  bio: {
    type: String,
  },
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/j8dbrxjiw/default_profile_img%20(1).png",
  },
},
  {
  timestamps: true
});

const userModel = mongoose.model("users", userSchema);
module.exports = userModel;