import mongoose from "mongoose";

export const connectMongoDB = async () => {
  try {
      mongoose.connect("mongodb+srv://diegoherreragre:K97ZkJZQJrBGuMZd@dbdhg.cum2t4l.mongodb.net/")
      console.log("MongoDB connected");
  } catch (error) {
    console.log(`Error: ${error}`);
  }
