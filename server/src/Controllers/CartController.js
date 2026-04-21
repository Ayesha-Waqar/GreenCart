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
    // 1. Extract userId (Ensure your auth middleware sets this correctly)
    const userId = req.userId; 
// console.log(userId)
    // 2. Fetch only the cartItems field to improve performance (.select)
    const userData = await user.findById(userId).select("cartItems");
// console.log(userData)
    // 3. Check if user exists
    if (!userData) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    // 4. Extract cartItems (Default to empty object if undefined)
    const cartData = userData.cartItems || {};

    // 5. Send successful response
    res.status(200).json({ 
      success: true, 
      cartData 
    });

  } catch (error) {
    console.error("Error in getCart:", error);
    res.status(500).json({ 
      success: false, 
      message: "Server Error: " + error.message 
    });
  }
};
module.exports = { updateCart  , getCart }