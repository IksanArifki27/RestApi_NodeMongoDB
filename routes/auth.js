require("dotenv").config();
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { registerValidation, loginValidation } = require("../config/validation");
const jwt = require("jsonwebtoken");

// register
router.post("/register", async (req, res) => {
  const { error } = registerValidation(req.body);
  if (error)
    return res.status(400).json({
      message: error.details[0].message,
    });
  // email exist
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({
      message: "Email sudah digunakan!",
    });

  // hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    nama: req.body.nama,
    email: req.body.email,
    password: hashPassword,
  });
  try {
    const insertUser = await user.save();
    res.status(200).json({
      message: "success",
      data: insertUser,
    });
  } catch (err) {
    res.status(400).json({
      message: "gagal create user",
    });
  }
});

// login
router.post("/login", async (req, res) => {
  // cek email
  const user = await User.findOne({
    email: req.body.email,
  });
  //   cek user
  if (!user)
    return res.status(400).json({
      message: "email anda salah!",
    });

  // cek password
  const validPwd = await bcrypt.compare(req.body.password, user.password);
  if (!validPwd)
    return res.status(400).json({
      message: "password anda Salah!",
    });

  const token = jwt.sign({ _id: user._id }, process.env.SECRET_KEY);
  res.header("auth-token", token).json({
    token: token,
  });
});
module.exports = router;
