const express = require("express");
const { connectDB } = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const accountRoutes = require("./routes/accountRoutes");

const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());
connectDB();
app.get("/", (req, res) => {
  res.send("Paytm Clone");
});

// user routes
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/account", accountRoutes);

app.listen(4000, () => {
  console.log("Server is running on port 4000");
});
