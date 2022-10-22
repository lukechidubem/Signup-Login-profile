const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const userRoute = require("./routes/user");
const port = 4004;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/auth", userRoute);

mongoose
  .connect("mongodb://localhost:27017/jonah2")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

app.listen(port, () => console.log("listening on port", port));
