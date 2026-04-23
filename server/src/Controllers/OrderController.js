const Order = require("../Models/OrderModel");
const Product = require("../Models/ProductModel");

// /api/order/cod
const placeOrderCOD = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;

    if (!userId || !address || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Incomplete data",
      });
    }

    let amount = 0;

    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      amount += product.offerPrice * item.quantity;
    }

    // tax 2%
    amount += Math.floor(amount * 0.02);

    const newOrder = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });

    return res.status(201).json({
      success: true,
      message: "New Order Created",
      order: newOrder,
    });
  } catch (err) {
    console.log("error in placing order through COD", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// /api/order/user
const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;
    console.log(userId);

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Login required",
      });
    }

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });
    console.log(orders);
    return res.status(200).json({
      success: true,
      message: "User Orders Fetched",
      orders,
    });
  } catch (err) {
    console.log("error in getting order data", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// /api/order/seller
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    console.log(orders);
    return res.status(200).json({
      success: true,
      message: "All Orders Fetched",
      orders,
    });
  } catch (err) {
    console.log("error in getting all orders", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = { placeOrderCOD, getUserOrders, getAllOrders };
