const express = require("express")
const authUser = require("../Middlewares/authUser");
const { placeOrderCOD, getUserOrders, getAllOrders, placeOrderStripe } = require("../Controllers/OrderController");



const OrderRouter = express.Router();

OrderRouter.post('/cod' , authUser , placeOrderCOD)
OrderRouter.get('/user' , authUser, getUserOrders)
OrderRouter.get('/seller' , getAllOrders)
OrderRouter.post('/online' , authUser , placeOrderStripe)

module.exports=OrderRouter

