const express = require("express")
const authUser = require("../Middlewares/authUser");
const { placeOrderCOD, getUserOrders, getAllOrders } = require("../Controllers/OrderController");



const OrderRouter = express.Router();

OrderRouter.post('/cod' , authUser , placeOrderCOD)
OrderRouter.get('/user' , authUser, getUserOrders)
OrderRouter.get('/seller' , getAllOrders)


module.exports=OrderRouter

