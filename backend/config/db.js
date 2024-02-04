const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log(err);
      console.log("DB connection failed");

      process.exit(1);
    });
};
