const express = require("express");
const { login, isAuth, logout } = require("../Controllers/SellerController");
const authSeller = require("../Middlewares/authSeller");


const sellerRouter = express.Router();

sellerRouter.post('/login' , login)
sellerRouter.get('/isAuth' , authSeller , isAuth)
sellerRouter.get('/logout' , logout)


module.exports = sellerRouter;