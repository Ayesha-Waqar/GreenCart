const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    mongoose.connection.on("connected", () => {
      console.log("DB connected");
    });

    await mongoose.connect(process.env.MONGOOSE_URI);

  } catch (err) {
    console.log("error", err);
  }
};

module.exports = connectDb;