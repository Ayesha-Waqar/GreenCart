const express = require("express");
const { registerUser  , loginUser, isAuth, logout} = require("../Controllers/UserController");
const authUser = require("../Middlewares/authUser");

const userRouter = express.Router();

userRouter.post('/register', registerUser);
userRouter.post('/login', loginUser);
userRouter.get('/isAuth',authUser, isAuth)
userRouter.get('/logout' ,authUser , logout)
module.exports = userRouter;