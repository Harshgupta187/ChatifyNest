import mongoose from "mongoose";

const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ DATABASE Connected");
  } catch (error) {
    console.error("❌ DATABASE Connection Failed:", error.message);
    throw error;
  }
};

export default ConnectDB;
