const mongoose = require("mongoose");
const bcrypt = require('bcrypt')
const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "Email is require"],
      lowercase: true,
      unique: true,
      trim: true,
    },
    username: {
      type: String,
      required: [true, "Username is require"],
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      select: false,
    },
  },
  {
    timestamps: true,
  },
);


// Task to use pre method
userSchema.pre('save', async function () {
    if (!this.isModified('password')) return 
    this.password = await bcrypt.hash(this.password, 10);
    
})

userSchema.methods.comparePassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password)
} 


const userModel = mongoose.model('User', userSchema)

module.exports = userModel