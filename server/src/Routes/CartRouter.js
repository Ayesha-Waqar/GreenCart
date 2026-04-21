const express = require("express")
const authUser = require("../Middlewares/authUser.js");
const { updateCart, getCart, } = require("../Controllers/CartController.js");


const cartRouter = express.Router();

cartRouter.post('/update', authUser , updateCart )
cartRouter.get("/get", authUser ,getCart);

module.exports=cartRouter;