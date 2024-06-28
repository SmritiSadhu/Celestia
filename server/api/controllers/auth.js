const User = require('../../models/Users');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const express = require('express');
const app = express();

const sessionConfig = {
  secret: process.env.SESSION_SECRET, // Secure secret key for session data
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false, maxAge: 1000 * 60 * 60 * 24 }, // Session expires in 24 hours (adjust as needed)
};
app.use(session(sessionConfig));

// REGISTER FUNCTION
async function registerUser(req, res) {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Please provide all fields" });
  }
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });
    await newUser.save();
    const generateToken = (userId) => {
      return 'Bearer '+ jwt.sign({ userId }, process.env.JWT_SECRET, { expiresIn: '1y' });
    };
    const token = generateToken(newUser._id);
    res.status(201).json({ message: "User created successfully", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
}

// LOGIN FUNCTION
async function loginUser(req, res){
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Please provide email and password" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
     // Successful login, create session and generate JWT
     const token = 'Bearer '+ jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '23h' }); // Set shorter expiry for JWT
     req.payload={ userId: user._id, token };
    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { registerUser, loginUser };
