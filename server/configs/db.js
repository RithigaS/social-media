import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.connection.on("connected", () =>
      console.log("✅ Database Connected")
    );

    mongoose.connection.on("error", (err) =>
      console.log("❌ MongoDB Connection Error:", err.message)
    );

    // Ensure we don't have double slashes if the user provided one
    const url = process.env.MONGODB_URL;
    await mongoose.connect(url);
  } catch (error) {
    console.log(
      "❌ Could not connect to MongoDB. If using Atlas, check if your network/college WiFi blocks port 27017."
    );
    console.error(error.message);
  }
};

export default connectDB;
