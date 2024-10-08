// const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/users.model");

// register user
const registerUser = async (req, res) => {
  const { userId, password } = req.body;
  try {
    let user = await User.findOne({ userId });
    if (user) {
      return res.status(400).json({ message: "User exists!" });
    }

    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    user = new User({
      userId,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    console.error(error);
  }
};

// login user
const loginUser = async (req, res) => {
  const { userId, password } = req.body;

  try {
    let user = await User.findOne({ userId });

    if (!user) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const payload = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h", // Token expiration time
    });

    res.json({ token });
  } catch (err) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

//show user name

const showUserName = async (req, res) => {
  res.send("Hello");
};

module.exports = {
  registerUser,
  loginUser,
  showUserName,
};
