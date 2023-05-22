const mongoose = require("mongoose");

const connectDB = async () => {
  await mongoose
    .connect(process.env.MONGODB_URI)
    .then((conn) => {
      console.log("::: ✅ DB connection successful :::".magenta.bold);
    })
    .catch((error) => {
      console.log("::: Some DB errors occurred!! :::".red.bold);
      console.log(error.message);
    });
};

module.exports = connectDB;
