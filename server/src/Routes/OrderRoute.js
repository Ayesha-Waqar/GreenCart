const express = require("express")
const authUser = require("../Middlewares/authUser");
const authSeller = require("../Middlewares/authSeller");
const { placeOrderCOD, getUserOrders, getAllOrders, placeOrderStripe } = require("../Controllers/OrderController");



const OrderRouter = express.Router();

OrderRouter.post('/cod' , authUser , placeOrderCOD)
OrderRouter.get('/user' , authUser, getUserOrders)
OrderRouter.get('/seller' , authSeller,getAllOrders)
OrderRouter.post('/online' , authUser , placeOrderStripe)

module.exports=OrderRouter

