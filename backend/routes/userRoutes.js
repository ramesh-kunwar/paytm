const express = require("express");
const { signup } = require("../controller/userController");

const router = express.Router();

// router.route("get", signup);
router.get("/signup", signup);

module.exports = router;
