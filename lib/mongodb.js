import mongoose from "mongoose";

export async function connectToDB() {
  console.log("MONGO_URI:", process.env.MONGO_URI); // Debugging log

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined in .env.local");
  }

  if (mongoose.connection.readyState >= 1) return;

  await mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  console.log("✅ Connected to MongoDB");
}
