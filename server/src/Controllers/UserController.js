const User = require("../Models/UserModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// REGISTER
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter all fields",
      });
    }

    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res.status(409).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(201).json({
      success: true,
      message: "User registered",
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    });

  } catch (err) {
    console.log("Error registering user:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// LOGIN
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter complete details",
      });
    }

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, existingUser.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { id: existingUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "User logged in successfully",
    });

  } catch (err) {
    console.log("Error logging user:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// IS AUTH
const isAuth = async (req, res) => {
  try {
    const userId = req.userId;

    const foundUser = await User.findById(userId);

    if (!foundUser) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "User Authorized",
      user: {
        name: foundUser.name,
        email: foundUser.email,
      },
    });

  } catch (err) {
    console.log("cant auth user", err);
    return res.status(500).json({
      success: false,
      message: "Auth error",
    });
  }
};


// LOGOUT
const logout = async (req, res) => {
  try {
    res.clearCookie("token", {   
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    });

    return res.status(200).json({
      success: true,
      message: "User Logged Out Successfully",
    });

  } catch (err) {
    console.log("error logging out", err);
    return res.status(500).json({
      success: false,
      message: "Logout error",
    });
  }
};

module.exports = { registerUser, loginUser, isAuth, logout };