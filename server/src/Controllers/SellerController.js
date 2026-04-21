const jwt = require("jsonwebtoken");

// LOGIN
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Enter complete details",
      });
    }

    if (
      email !== process.env.SELLER_EMAIL ||
      password !== process.env.SELLER_PASSWORD
    ) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign(
      { email, role: "seller" },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // dev me false rakho
      sameSite: "lax", // strict issues avoid karega
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Seller logged in successfully",
    });

  } catch (err) {
    console.log("Error logging seller:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


// IS AUTH
const isAuth = async (req, res) => {
  try {
    return res.status(200).json({
      success: true,
      message: "User Authorized",
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

module.exports = { login, isAuth, logout };