const express = require("express");
const {
  getBalance,
  transferBalance,
} = require("../controller/accountController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

// router.route("get", signup);

router.get("/balance", authMiddleware, getBalance);

router.post("/transfer", authMiddleware, transferBalance);

module.exports = router;
