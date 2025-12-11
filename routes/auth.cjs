const express = require('express');
const bcrypt = require('bcryptjs');
const Credentials = require('../models/Credentials.jsx');
const router = express.Router();
const mongoose = require( "mongoose");

// POST /api/signup
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await Credentials.findOne({ $and: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ message: 'Username and Email already exists' });
    }
    const existingUserEmail = await Credentials.findOne({ email });
    if (existingUserEmail) {
      return res.status(400).json({ message: 'Email already exists' });
    }
    const existingUserUsername = await Credentials.findOne({ username });
    if (existingUserUsername) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const password_hash = await bcrypt.hash(password, salt);

    // Create user
    const newUser = new Credentials({
      user_id: new mongoose.Types.ObjectId(), // or your user _id from another model
      username,
      email,
      password_hash,
      salt
    });

    await newUser.save();

    res.status(201).json({ message: 'Signup successful' });
    console.log('Sign Up Successful')
  } catch (error) {
    console.error('Signup Error:', error);
    res.status(500).json({ message: 'Server error during signup' });
  }
});

const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Credentials.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    user.last_login = new Date();
    await user.save();

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        username: user.username,
        email: user.email
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
