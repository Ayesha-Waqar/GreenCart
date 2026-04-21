const Product = require("../Models/ProductModel");
const { cloudinary } = require("../Services/Cloudinary");

// ADD PRODUCT
const addProduct = async (req, res) => {
  try {
    const productData = JSON.parse(req.body.productData);

    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No images uploaded",
      });
    }

    const images = req.files;
    console.log(req.files)

    const imagesUrl = await Promise.all(
      images.map(async (file) => {
        const result = await cloudinary.uploader.upload(file.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const newProduct = await Product.create({
      ...productData,
      image: imagesUrl,
    });

    return res.status(201).json({
      success: true,
      message: "Product added successfully",
      product: newProduct,
    });

  } catch (err) {
    console.log("Error adding product:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while adding product",
    });
  }
};


// GET ALL PRODUCTS
const productList = async (req, res) => {
  try {
    const products = await Product.find({});

    return res.status(200).json({
      success: true,
      message: "All products fetched",
      products,
    });

  } catch (err) {
    console.log("Error fetching products:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching products",
    });
  }
};


// GET SINGLE PRODUCT
const productById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Product ID required",
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Product fetched",
      product,
    });

  } catch (err) {
    console.log("Error fetching product:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching product",
    });
  }
};


// UPDATE STOCK
const changeStock = async (req, res) => {
  try {
    const { id } = req.params;
    const { inStock } = req.body;

    if (!id || inStock === undefined) {
      return res.status(400).json({
        success: false,
        message: "Incomplete data",
      });
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      { inStock },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Stock updated successfully",
      product: updatedProduct,
    });

  } catch (err) {
    console.log("Error updating stock:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while updating stock",
    });
  }
};


// EXPORT
module.exports = {
  addProduct,
  productList,
  productById,
  changeStock,
};