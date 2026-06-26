const Order = require("../Models/OrderModel");
const Product = require("../Models/ProductModel");
const stripe = require("stripe");
const user = require("../Models/UserModel");

// ================= COD =================
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

    let amount = await items.reduce(async (accPromise, item) => {
      const product = await Product.findById(item.product);
      return (await accPromise) + product.offerPrice * item.quantity;
    }, Promise.resolve(0));

    //add tax
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
      message: "Order Created",
      order: newOrder,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= STRIPE =================
const placeOrderStripe = async (req, res) => {
  try {
    const { items, address } = req.body;
    const userId = req.userId;
    const { origin } = req.headers;

    if (!userId || !address || !items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Incomplete data",
      });
    }

    let productData = [];
    let amount = 0;

    for (let item of items) {
      const product = await Product.findById(item.product);

      if (!product) {
        return res.status(404).json({
          success: false,
          message: "Product not found",
        });
      }

      productData.push({
        name: product.name,
        price: product.offerPrice,
        quantity: item.quantity,
      });

      amount += product.offerPrice * item.quantity;
    }

    amount += Math.floor(amount * 0.02);

    const newOrder = await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "Online",
      isPaid: false,
    });

    const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

    const lineItems = productData.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.floor(item.price + item.price * 0.02) * 100, // Convert to cents and add tax
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/loading?next=/orders`, // ✅ FIXED
      cancel_url: `${origin}/cart`,
      metadata: {
        orderId: newOrder._id.toString(), // ✅ FIXED
        userId,
      },
    });

    return res.status(201).json({
      success: true,
      url: session.url,
    });
  } catch (err) {
    console.log("Stripe error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ================= WEBHOOK  verify payment=================
const stripeWebHook = async (req, res) => {
  const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);
  const sig = req.headers["stripe-signature"];

  let event;

  try {
    event = stripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.log("Webhook Error:", err.message);
    return res.status(400).send(`Webhook Error`);
  }


  switch (event.type) {
    case "payment_intent.succeeded":
      {
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;
        // getting the metadata from the payment intent
        const session = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntentId,
          limit: 1,
        });
        const { orderId, userId } = session.data[0].metadata;
        // Update the order in the database 
        await Order.findByIdAndUpdate(orderId, { isPaid: true });
        //clear cart items for the user
        await user.findByIdAndUpdate(userId, { cart: [] });
        break;
      }
    case "payment_intent.payment_failed": {
      {
        const paymentIntent = event.data.object;
        const paymentIntentId = paymentIntent.id;
        // getting the metadata from the payment intent
        const session = await stripeInstance.checkout.sessions.list({
          payment_intent: paymentIntentId,
          limit: 1,
        });
        const { orderId } = session.data[0].metadata;
        await Order.findByIdAndDelete(orderId);
        break;
      }
    }
    default:
      console.log(`Unhandled event type ${event.type}`);
  }
  return res.status(200).json({ received: true });



};

// ================= USER ORDERS =================
const getUserOrders = async (req, res) => {
  try {
    const userId = req.userId;

    const orders = await Order.find({
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

// ================= ALL ORDERS =================
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      $or: [{ paymentType: "COD" }, { isPaid: true }],
    })
      .populate("items.product address")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

module.exports = {
  placeOrderCOD,
  placeOrderStripe,
  stripeWebHook,
  getUserOrders,
  getAllOrders,
};