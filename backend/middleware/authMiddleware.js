//

const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const CONFIG = require("../config/config");

exports.authMiddleware = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(403).json({
      msg: "Not valid header",
    });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, CONFIG.JWT_SECRET);

    req.userId = decoded.userId;
    next();
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      error,
    });
  }
  //   next();
});
