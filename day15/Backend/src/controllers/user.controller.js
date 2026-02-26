const { request } = require('../app');
const followModel = require('../models/follow.model');
const userModel = require('../models/user.model');


// async function followUserController(req, res) {
//     const followerUsername = req.user.username;
//     const followeeUsername = req.params.username;


//      const isAlreadyFollowing = await followModel.findOne({
//        follower: followerUsername,
//        followee: followeeUsername,
//      });
    
//     const isFolloweeExist = await userModel.findOne({
//       username: followeeUsername,
//     });

//     if (!isFolloweeExist) {
//         return res.status(404).json({
//             message: "User you are trying to follow dose not exist"
//         })
//     }

//      if (isAlreadyFollowing) {
//        return res.status(409).json({
//          message: "You are already following the user",
//        });
//     }
    
//     if (followeeUsername == followerUsername) {
//       return res.status(400).json({
//         message: "You cannot follow yourself",
//       });
//     }

//     const followRecord = await followModel.create({
//       follower: followerUsername,
//       followee: followeeUsername,
//       status: 'pending'
//     });


//     res.status(201).json({
//         message: `Your are now following ${followeeUsername}`,
//         follow: followRecord
//     })
// }

// async function unfollowUserController(req, res) {
//     const followUsername = req.user.username;
//   const followeeUsername = req.params.username;

//     const isUserFollowing = await followModel.findOne({
//       follower: followUsername,
//       followee: followeeUsername,
//     });
    
//     if (!isUserFollowing) {
//         return res.status(400).json({
//             message: "You are not following user"
//         })
//     }
    
//     await followModel.findByIdAndDelete(isUserFollowing._id)

//     res.status(200).json({
//         message: "You have unfollowed user"
//     })

// }


async function sendFollowRequestController(req, res) {
  const followerId = req.user.id;
  const followeeUsername = req.params.username;

  const followee = await userModel.findOne({ username: followeeUsername });

  if (!followee) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (followee._id.toString() === followerId) {
    return res.status(400).json({
      message: "You cannot follow yourself",
    });
  }

  const existingRequest = await followModel.findOne({
    follower: followerId,
    followee: followee._id,
  }); 

  if (existingRequest) {
    return res.status(409).json({
      message: "Request already sent",
    });
  }

  const request = await followModel.create({
    follower: followerId,
    followee: followee._id,
  });

    res.status(201).json({
      message: "Follow request sent",
      request,
    });
}

async function getFollowRequestsController(req, res) {
  const userId = req.user.id;

  const requests = await followModel
    .find({
      followee: userId,
      status: "pending",
    })
    .populate("follower", "username email");

  res.status(200).json({
    count: requests.length,
    requests,
  });
}

async function updateFollowRequestController(req, res) {
  const userId = req.user.id;
  const { requestId } = req.params;
  const { status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status",
    });
  }

  const request = await followModel.findById(requestId)

  if (!request) {
    return res.status(404).json({
      message: "Request not found"
    })
  }

  if (request.followee.toString() !== userId) {
    return res.status(403).json({
      message: "Not Unauthorized"
    })
  }

  request.status = status;
  await request.save();

  res.json({
    message: `Request ${status}`,
    request
  })
}



module.exports = {
  sendFollowRequestController,
  getFollowRequestsController,
  updateFollowRequestController,
};