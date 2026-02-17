const mongoose = require('mongoose')

const followSchema = new mongoose.Schema(
  {
    follower: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
      require: [true],
    },
    followee: {
      ref: "users",
      type: mongoose.Schema.Types.ObjectId,
      require: [true],
    },
  },
  {
    timestamps: true,
  },
);

const followModel = mongoose.model('follows', followSchema)
module.exports = followModel;