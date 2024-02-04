const express = require("express");
const { signup, signin } = require("../controller/userController");

const router = express.Router();

// router.route("get", signup);
router.post("/signup", signup);
router.post("/signin", signin);

module.exports = router;
