const mongoose = require("mongoose")


const orderSchema = new mongoose.Schema({
   userId : {type : String , required: true , ref:"user"},
   items: [{
    product : {type : String , required: true , ref:"Product" },
    quantity : {type : Number , required: true}
   }],
    amount : {type : Number , required: true},
    address:{type : String , required : true , ref:"Address"},
    status:{type:String , default : "Order Placed"},
    PaymentType:{type:String , default : "Order Placed"},
    isPaid : {type : Boolean , required : true , default : false}
},{timestamps:true})


const Order = mongoose.models.order || mongoose.model("order", orderSchema)


module.exports = Order;