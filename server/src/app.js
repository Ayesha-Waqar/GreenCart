const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const userRouter = require("./Routes/UserRoutes");
const sellerRouter = require("./Routes/SellerRoutes");
const ProductRouter = require("./Routes/ProductRoutes");
const cartRouter = require("./Routes/CartRouter");
const addressRouter = require("./Routes/AddressRoute");
const OrderRouter = require("./Routes/OrderRoute");

const app = express();

const allowedOrigins = ["http://localhost:5173"];

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: allowedOrigins,
    credentials: true,
}));

app.use("/api/user" , userRouter)
app.use("/api/seller" , sellerRouter)
app.use('/api/product' ,ProductRouter)
app.use('/api/cart' ,cartRouter )
app.use('/api/address' ,addressRouter )
app.use('/api/order' ,OrderRouter )

module.exports = app;   