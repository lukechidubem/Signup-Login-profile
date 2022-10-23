const userModel = require("../database/userSchema");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const { hashPassword, comparePassword } = require("../utilities/helpers");
const secretKey = process.env.SECRET_KEY;

//Creating new user
exports.createUser = async function (req, res) {
  const newUser = req.body;

  try {
    const existingUser = await userModel.findOne({ email: newUser.email });
    // console.log(existingUser);
    if (existingUser) {
      // res.redirect("http://127.0.0.1:5500/frontend/login.html");
      res.status(400).json({ status: false, message: "User already exists!" });
    } else {
      const password = hashPassword(newUser.password);
      newUser.password = password;
      const user = await userModel.create(newUser);
      res
        .status(201)
        .json({ status: true, message: "User Created Successfully" });
    }
  } catch (err) {
    console.log(err);
  }
};

// Logging in User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password)
      return res
        .status(400)
        .json({ status: false, message: "Missing credentials" });

    const userDB = await userModel.findOne({ email });

    if (!userDB)
      return res.status(401).json({ status: false, message: "User not found" });

    const isPasswordValid = comparePassword(password, userDB.password);
    if (isPasswordValid) {
      const token = jwt.sign({ email, id: userDB._id }, secretKey, {
        expiresIn: "1d",
      });

      console.log("Authentication successful");
      // userDB.token = token;
      return res
        .status(200)
        .json({ status: true, message: "Login successful", token });
    } else {
      console.log("Authentication failed");
      return res
        .status(401)
        .json({ status: false, message: "Wrong credentials" });
    }
  } catch (err) {
    console.log(err);
  }
};

// Getting a user
exports.getUser = async (req, res) => {
  const token = req.headers.authorization;

  try {
    const decoded = jwt.verify(token, secretKey);
    console.log(decoded);

    const id = decoded.id;

    // res.locals.email = decoded.email;
    const userData = await userModel.findById(id);

    if (userData) {
      delete userData.password;
      res.status(200).json({
        status: true,
        data: userData,
        message: "User data retrived",
      });
    } else {
      res.status(404).json({ status: false, message: "Wrong token" });
    }
  } catch (err) {
    console.log(err);
    res.status(401).json({ status: false, message: "Invalid token" });
  }
};
