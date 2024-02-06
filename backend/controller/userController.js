const User = require("../model/userSchema");
const Account = require("../model/accountSchema");
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

  await Account.create({
    userId,
    balance: Math.random() * 10000 + 1,
  });

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
  const { email, password, userId } = req.body;

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

  const token = jwt.sign({ userId: user._id }, CONFIG.JWT_SECRET);

  if (user && matchedPassword) {
    return res.status(200).json({
      success: true,
      msg: "Login successfully",
      token,
      user,
    });
  }
});

exports.updateUser = asyncHandler(async (req, res, next) => {
  const { firstName, lastName, password } = req.body;
  // const id = await User.findOne({ _id: req.userId });
  console.log(req.userId);
  let hashedPassword = password;

  if (password) {
    hashedPassword = await bcrypt.hash(password, 10);
  } else {
    hashedPassword = password;
  }

  const user = await User.findByIdAndUpdate(
    req.userId,
    {
      firstName: firstName || req?.body?.firstName,
      lastName: lastName || req?.body?.lastName,
      password: hashedPassword,
    },
    { new: true }
  );

  return res.status(200).json({
    success: true,
    msg: "User details updated successfully",
    user,
  });

  // res.json({ user });
});

exports.getAllUsers = asyncHandler(async (req, res, next) => {
  // const { firstName, lastName } = req.query || "";
  const firstName = req.query.firstName || "";
  const lastName = req.query.lastName || "";
  // console.log(filter);
  console.log(firstName, lastName);

  let user = await User.find({});
  if (firstName || lastName) {
    user = await User.find({
      $and: [
        {
          firstName: {
            $regex: firstName,
          },
        },
        {
          lastName: {
            $regex: lastName,
          },
        },
      ],
    });
  }

  return res.status(200).json({
    count: user.length,
    success: true,
    user,
  });
});
