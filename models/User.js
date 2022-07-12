const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
  nama: {
    type: String,
    required: true,
    max: 100,
  },
  email: {
    type: String,
    required: true,
    max: 100,
  },
  password: {
    type: String,
    required: true,
    min: 100,
    max: 1024,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
