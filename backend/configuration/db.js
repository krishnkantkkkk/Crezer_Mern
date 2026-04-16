import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGODB_URI).then(()=>{
        console.log("Connected to MongoDB");
    }).catch((err)=>{
        console.error("Error connecting to MongoDB:", err);
    });
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
};

export default connectDB;