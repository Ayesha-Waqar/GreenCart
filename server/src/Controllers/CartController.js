const user = require("../Models/UserModel");


// /api/cart/update
const updateCart = async (req, res) => {
  try {
    const { cartItems } = req.body;
    const userId = req.userId;

    // console.log("backend " , cartItems)

    if (!userId || !cartItems) {
      return res.status(400).json({
        success: false,
        message: "Incomplete data",
      });
    }

    await user.findByIdAndUpdate(userId, { cartItems });

    return res.status(200).json({
      success: true,
      message: "Cart Updated",
    });

  } catch (err) {
    console.log("error updating cart", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


const getCart = async (req, res) => {
  try {
    // Middleware se aane wali userId (req.body.userId ya req.userId)
    const userId = req.userId; 

    // Cart collection ke bajaye User collection mein dhoondna hai
    const userData = await user.findById(userId);

    if (!userData) {
      return res.status(404).json({ success: false, message: "User nahi mila" });
    }

    // Database mein field ka naam 'cartItems' hai jaisa image mein dikh raha hai
    const cartData = userData.cartItems || {};

    res.status(200).json({ success: true, cartData });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
module.exports = { updateCart  , getCart }