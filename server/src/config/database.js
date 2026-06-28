import mongoose from "mongoose";

export async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("✅ MongoDB connected");
    return true;
  } catch (error) {
    console.error(
      "⚠️ MongoDB connection failed (server will keep running):",
      error?.message || error,
    );
    return false;
  }
}

export default connectDB;
