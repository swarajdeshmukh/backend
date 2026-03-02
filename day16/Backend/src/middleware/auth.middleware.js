const jwt = require('jsonwebtoken');
const backlistModel = require('../models/blacklistToken.model');
const redis = require('../config/cache')

async function identifyUser(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: "Token not provided"
        })
    }

    const isBlacklisted = await redis.get(token);
      
      if (isBlacklisted) {
        return res.status(401).json({
          message: "Invalid token, Please login again.",
        });
      }
    
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            message: "Invalid token"
        })
    }

}

module.exports = identifyUser;