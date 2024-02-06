const express = require("express");
const {
  signup,
  signin,
  updateUser,
  getUser,
  getAllUsers,
} = require("../controller/userController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// router.route("get", signup);
router.post("/signup", signup);
router.post("/signin", signin);
router.put("/updateUser", authMiddleware, updateUser);
router.get("/bulk", getAllUsers);

module.exports = router;
