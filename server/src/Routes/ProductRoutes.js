const express = require("express");
const {
  addProduct,
  productList,
  productById,
  changeStock,
} = require("../Controllers/ProductController");
const upload = require("../Services/Multer");
const authSeller = require("../Middlewares/authSeller");

const ProductRouter = express.Router();

ProductRouter.post(
  "/addProduct",
  upload.array("images", 5), // max 5 images
  authSeller,
  addProduct
);
ProductRouter.get("/getProducts", productList);
ProductRouter.get("/getProduct/:id", productById);
ProductRouter.post("/changeStock/:id", authSeller, changeStock);

module.exports = ProductRouter;   