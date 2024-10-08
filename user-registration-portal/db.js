const mongoose = require("mongoose");

const connect_db = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to DB!");
  } catch (error) {
    console.error("Error connecting to the database:", error.message);
  }
};

module.exports = { connect_db };
