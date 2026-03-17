import jwt from "jsonwebtoken";

export function authUser(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({
        message: "Unauthorize access",
        success: false,
        err: "No token provided",
      });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      
      next()
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
      success: false,
      err: "Invalid token",
    });
  }
}
