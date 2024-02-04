const User = require("../model/userSchema");
const asyncHandler = require("express-async-handler");
const zod = require("zod");
const CONFIG = require("../config/config");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const signupSchema = zod.object({
  firstName: zod.string(),
  lastName: zod.string(),
  email: zod.string().email(),
  password: zod.string(),
});

exports.signup = asyncHandler(async (req, res, next) => {
  const body = req.body;

  // validate

  const { success } = signupSchema.safeParse(req.body);

  if (!success) {
    return res.status(411).json({
      message: "Email already exists / Incorrect inputs",
    });
  }

  const existingUser = await User.findOne({
    email: req.body.email,
  });

  if (existingUser) {
    return res.status(411).json({
      message: "Email already taken/Incorrect inputs",
    });
  }

  const hashedPassword = await bcrypt.hash(req.body.password, 10);

  const user = await User.create({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    password: hashedPassword,
  });
  const userId = user._id;

  const token = jwt.sign(
    {
      userId,
    },
    CONFIG.JWT_SECRET
  );

  return res.status(201).json({
    success: true,
    msg: "User registered successfully",
    token,
    user,
  });
});

exports.signin = asyncHandler(async (req, res, next) => {
  // take email and password
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      msg: "All fields are required",
    });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({
      msg: "User doesnt exist",
    });
  }
  const matchedPassword = await bcrypt.compare(password, user.password);
  if (!user || !matchedPassword) {
    return res.status(400).json({
      msg: "Login failed",
    });
  }

  const token = await jwt.sign({ email }, CONFIG.JWT_SECRET);

  if (user && matchedPassword) {
    return res.status(200).json({
      success: true,
      msg: "Login successfully",
      token,
    });
  }
});
