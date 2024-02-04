const User = require("../model/userSchema");
const asyncHandler = require("express-async-handler");

exports.signup = asyncHandler(async (req, res, next) => {
  res.send("hello signup");
});
