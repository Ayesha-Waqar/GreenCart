const express= require("express")
const authUser = require("../Middlewares/authUser");
const { addAddress, getAddress } = require("../Controllers/AddressController");

const addressRouter= express.Router();

addressRouter.post('/add' , authUser , addAddress)
addressRouter.get('/get' , authUser , getAddress)


module.exports=addressRouter  