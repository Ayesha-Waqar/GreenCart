const { v2: cloudinary } = require("cloudinary");

const connectCloudinary = () => {
  // console.log(process.env.CLOUDINARY_CLOUD_NAME);
  // console.log(process.env.CLOUDINARY_API_KEY);
  // console.log(process.env.CLOUDINARY_API_SECRET);
  
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
      });
      // console.log(cloudinary.config());
};

module.exports = { cloudinary, connectCloudinary };