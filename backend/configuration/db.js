import mongoose from "mongoose";
import config from "./config.js";

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

const connectDB = async () => {
  if (cached.conn) return cached.conn;

  if (!cached.promise) {
    cached.promise = mongoose.connect(config.MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
    });
  }

  cached.conn = await cached.promise;
  console.log("Connected to MongoDB");

  return cached.conn;
};

export default connectDB;