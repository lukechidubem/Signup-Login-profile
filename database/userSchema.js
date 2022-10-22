const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },

  name: String,

  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },

  phone: String,

  gender: String,

  createdAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },

  updatedAt: {
    type: mongoose.SchemaTypes.Date,
    required: true,
    default: new Date(),
  },
});

const userModel = mongoose.model("users", UserSchema);
module.exports = userModel;
