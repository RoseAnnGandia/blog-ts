import mongoose from "mongoose";

export async function connectToDB() {
  try {
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("Connected to the database");
  } catch (error) {
    console.error("Error connecting to the database: ", error);
    process.exit(1);
  }
}
