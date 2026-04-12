import mongoose from "mongoose";
import { config } from "./config.js";

async function connectDB() {
    const mongoUri = config.MONGO_URI;

    if (!mongoUri) {
        throw new Error("MONGO_URI is not define in environment variables")
    }

    await mongoose.connect(mongoUri);
    console.log("MongoDB connected successfully.")
}

export default connectDB;