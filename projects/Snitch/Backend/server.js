import app from "./src/app.js";
import connectDB from "../Backend/src/config/db.js";

const PORT = Number(process.env.PORT) || 8000;

const startServer = async () => {
  try {
    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
