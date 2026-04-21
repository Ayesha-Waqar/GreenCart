const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  // console.log(req.body)
  const { token } = req.cookies;
  // console.log(token)
  if (!token) {
    return res.status(401).json({
      message: "Unauthorized User"
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    if (decoded.id) {
      req.userId = decoded.id// better practice than req.body
      // console.log(req.userId)
    } else {
      return res.status(401).json({
        message: "Can't verify user"
      });
    }

    next();

  } catch (err) {
    console.log("Error authorizing user:", err);
    return res.status(401).json({
      message: "Invalid token"
    });
  }
};

module.exports = authUser;