const mongoose = require("mongoose");
const z = require("zod");
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Virtual field to reverse populate books in the Author model
userSchema.virtual("books", {
  ref: "Account",
  localField: "_id",
  foreignField: "account",
});
// Enable the virtual field
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });
module.exports = mongoose.model("User", userSchema);
