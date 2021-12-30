const mongoose = require("mongoose");

module.exports = async function connectDB(URI, connectServer) {
  try {
    mongoose.connect(URI, () => {
      console.log("Connected to Atlas");
      connectServer();
    });
  } catch (error) {
    console.log(err);
  }
};
