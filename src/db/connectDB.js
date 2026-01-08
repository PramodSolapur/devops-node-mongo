import mongoose from "mongoose";

const connectDB = async () => {
  return await mongoose.connect(process.env.MONGODB_URI);
};

export default connectDB;
