// const Order = require("../Models/OrderModel");
// const Product = require("../Models/ProductModel");
// const stripe = require("stripe");
// const user = require('../Models/UserModel')
  
//     // /api/order/cod
// const placeOrderCOD = async (req, res) => {
//   try {
//     const { items, address } = req.body;
//     const userId = req.userId;

//     if (!userId || !address || !items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Incomplete data",
//       });
//     }

//     let amount = 0;

//     for (let item of items) {
//       const product = await Product.findById(item.product);

//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: "Product not found",
//         });
//       }

//       amount += product.offerPrice * item.quantity;
//     }

//     // tax 2%
//     amount += Math.floor(amount * 0.02);

//     const newOrder = await Order.create({
//       userId,
//       items,
//       amount,
//       address,
//       paymentType: "COD",
//     });

//     return res.status(201).json({
//       success: true,
//       message: "New Order Created",
//       order: newOrder,
//     });
//   } catch (err) {
//     console.log("error in placing order through COD", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // /api/order/online
// // const placeOrderStripe = async (req, res) => {
// //   try {
// //     const { items, address } = req.body;
// //     const userId = req.userId;
// //     const { origin } = req.headers;

// //     if (!userId || !address || !items || items.length === 0) {
// //       return res.status(400).json({
// //         success: false,
// //         message: "Incomplete data",
// //       });
// //     }

// //     let productData = [];

// //     let amount = 0;
// //     for (let item of items) {
// //       const product = await Product.findById(item.product);
// //       productData.push({
// //         name: product.name,
// //         proce: product.offerPrice,
// //         quantity: item.quantity,
// //       });
// //       if (!product) {
// //         return res.status(404).json({
// //           success: false,
// //           message: "Product not found",
// //         });
// //       }

// //       amount += product.offerPrice * item.quantity;
// //     }

// //     // tax 2%
// //     amount += Math.floor(amount * 0.02);

// //     const newOrder = await Order.create({
// //       userId,
// //       items,
// //       amount,
// //       address,
// //       paymentType: "Online",
// //     });

// //     //adding stripe
// //     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);


// //     //create line items for stripe
// //     const lineItems = productData.map((item) => {
// //       return {
// //         price_data: {
// //           currency: "usd",
// //           product_data: {
// //             name: item.name,
// //           },
// //           unit_amount: Math.floor(item.price * 1.02 * 100), // price + 2% and convert to cents
// //         },
// //         quantity: item.quantity,
// //       };
// //     });


// //     // cretae session 
// //     const session = await stripeInstance.checkout.sessions.create({
// //       line_items,
// //       mode : "payment",
// //       success_url: `${origin}/loader?next=orders`,
// //       cancel_url:`${origin}/cart`,
// //       metadata:{
// //         orderID : Order._id.toString(),
// //         userId,
// //       }
// //     })



// //     return res.status(201).json({
// //       success: true,
// //      url : session.url 
// //     });
// //   } catch (err) {
// //     console.log("error in placing order through COD", err);
// //     return res.status(500).json({
// //       success: false,
// //       message: "Server error",
// //     });
// //   }
// // };

// const placeOrderStripe = async (req, res) => {
//   try {
//     const { items, address } = req.body;
//     const userId = req.userId;
//     const { origin } = req.headers;

//     if (!userId || !address || !items || items.length === 0) {
//       return res.status(400).json({
//         success: false,
//         message: "Incomplete data",
//       });
//     }

//     let productData = [];
//     let amount = 0;

//     for (let item of items) {
//       const product = await Product.findById(item.product);

//       if (!product) {
//         return res.status(404).json({
//           success: false,
//           message: "Product not found",
//         });
//       }

//       productData.push({
//         name: product.name,
//         price: product.offerPrice,
//         quantity: item.quantity,
//       });

//       amount += product.offerPrice * item.quantity;
//     }

//     // tax 2%
//     amount += Math.floor(amount * 0.02);

//     const newOrder = await Order.create({
//       userId,
//       items,
//       amount,
//       address,
//       paymentType: "Online",
//     });

//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//     const lineItems = productData.map((item) => ({
//       price_data: {
//         currency: "usd",
//         product_data: {
//           name: item.name,
//         },
//         unit_amount: Math.round(item.price * 100),
//       },
//       quantity: item.quantity,
//     }));

//     const session = await stripeInstance.checkout.sessions.create({
//       line_items: lineItems,
//       mode: "payment",
//       success_url: `${origin}/loader?next=orders`,
//       cancel_url: `${origin}/cart`,
//       metadata: {
//         orderId: newOrder._id.toString(),
//         userId,
//       },
//     });

//     return res.status(201).json({
//       success: true,
//       url: session.url,
//     });

//   } catch (err) {
//     console.log("Stripe order error:", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // ORDER VERIFY FUNCTION webhook verify payment

// const stripeWebHook = async(req, res)=>{

//   //gateway intialize 
//     const stripeInstance = new stripe(process.env.STRIPE_SECRET_KEY);

//     const sig = req.headers['stripe-signature']
//     let event ;
//     try{
//       event = stripeInstance.webhooks.constructEvent(
//         req.body ,
//         sig,
//         process.env.STRIPE_WEBHOOK_SECRET
//       );


//     }
//     catch(err){
//       return res.status(400).json({
//         message : "webhook error"
//       })
//       console.log(err)
//     }

//     //handle event 
//     switch (event.type) {
//       case "payment_intent.succeeded":{
//         const paymentIntent = event.data.object;
//         const paymentIntentId = paymentIntent.id;
 
//         //session meta data
//         const session = await stripeInstance.checkout.sessions.list({
//           payment_intent : paymentIntentId,
//         })

//         const {orderId , userId} = session.data[0].metadata;

//         //mark payment as paid
//         await Order.findByIdAndUpdate(orderId , {isPaid: true})

//         //clean user data
//         await user.findByIdAndUpdate(userId , {cartItems :{} })

//            break;
//       }
//  /// failll/////////////////
//        case "payment_intent.payment_failed":{
//         const paymentIntent = event.data.object;
//         const paymentIntentId = paymentIntent.id;
 
//         //session meta data
//         const session = await stripeInstance.checkout.sessions.list({
//           payment_intent : paymentIntentId,
//         })

//         const {orderId} = session.data[0].metadata;

//         //del order coz of fail payment 
//         await Order.findByIdAndDelete(orderId)
//         break;
//       }
//       default:
//         console.err(`unhandled payment type ${event.type}`)
//         break;
//     }

//     return res.status(200).json({
//       received : true
//     })
// }


// // /api/order/user
// const getUserOrders = async (req, res) => {
//   try {
//     const userId = req.userId;
//     console.log(userId);

//     if (!userId) {
//       return res.status(401).json({
//         success: false,
//         message: "Login required",
//       });
//     }

//     const orders = await Order.find({
//       userId,
//       $or: [{ paymentType: "COD" }, { isPaid: true }],
//     })
//       .populate("items.product address")
//       .sort({ createdAt: -1 });
//     console.log(orders);
//     return res.status(200).json({
//       success: true,
//       message: "User Orders Fetched",
//       orders,
//     });
//   } catch (err) {
//     console.log("error in getting order data", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// // /api/order/seller
// const getAllOrders = async (req, res) => {
//   try {
//     const orders = await Order.find({
//       $or: [{ paymentType: "COD" }, { isPaid: true }],
//     })
//       .populate("items.product address")
//       .sort({ createdAt: -1 });

//     console.log(orders);
//     return res.status(200).json({
//       success: true,
//       message: "All Orders Fetched",
//       orders,
//     });
//   } catch (err) {
//     console.log("error in getting all orders", err);
//     return res.status(500).json({
//       success: false,
//       message: "Server error",
//     });
//   }
// };

// module.exports = {
//   placeOrderCOD,
//   getUserOrders,
//   getAllOrders,
//   placeOrderStripe,
//   stripeWebHook
// };


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
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    const session = await stripeInstance.checkout.sessions.create({
      line_items: lineItems,
      mode: "payment",
      success_url: `${origin}/loader?success=true&orderId=${newOrder._id}`,
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

// ================= WEBHOOK =================
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
  console.log("33333333333333333333333333")
// console.log(event.type)
console.log("WEBHOOK HIT");
console.log("EVENT:", event.type);
console.log("METADATA:", event.data.object.metadata);

  // ✅ FIXED EVENT
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    const { orderId, userId } = session.metadata;

    try {
      await Order.findByIdAndUpdate(orderId, { isPaid: true });
      await user.findByIdAndUpdate(userId, { cartItems: {} });
    } catch (err) {
      console.log("DB update error:", err);
    }
  }

  res.status(200).json({ received: true });
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