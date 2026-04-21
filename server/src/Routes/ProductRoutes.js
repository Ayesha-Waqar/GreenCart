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

// ================= ADD PRODUCT =================
ProductRouter.post(
  "/addProduct",
  upload.array("images", 5), // max 5 images
  authSeller,
  addProduct
);

// ================= GET ALL PRODUCTS =================
ProductRouter.get("/getProducts", productList);

// ================= GET SINGLE PRODUCT =================
ProductRouter.get("/getProduct/:id", productById);

// ================= CHANGE STOCK =================
ProductRouter.put("/changeStock/:id", authSeller, changeStock);

module.exports = ProductRouter;   