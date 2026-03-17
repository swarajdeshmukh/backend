import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import { testAi } from "./src/services/ai.service.js";

const PORT = process.env.PORT || 8000;
// testAi();
connectDB().catch((error) => {
  console.error("MongoDB connection failed:", error);
  process.exit(1);
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
