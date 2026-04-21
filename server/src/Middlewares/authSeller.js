const jwt = require("jsonwebtoken");

const authSeller = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized User",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.email === process.env.SELLER_EMAIL) {
      next();
    } else {
      return res.status(401).json({
        message: "Can't verify seller",
      });
    }

  } catch (err) {
    console.log("Error authorizing seller:", err);
    return res.status(401).json({
      message: "Invalid token",
    });
  }
};

module.exports = authSeller;