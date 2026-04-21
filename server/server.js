require("dotenv").config();

const app = require("./src/app");
const connectDb = require("./src/Db/db");
const { connectCloudinary } = require("./src/Services/Cloudinary");

const port = process.env.PORT || 3000;

async function startServer() {
  await connectDb();
   connectCloudinary(); 

  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

startServer();