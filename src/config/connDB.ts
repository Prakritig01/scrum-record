import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "";

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
    process.exit(1); // Exit the process with failure
  }
};

export default connectDB;
