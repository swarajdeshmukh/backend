import "dotenv/config";
import app from "./src/app.js";
import { connectDB } from "./src/config/db.js";
import http from 'http'
import { initSocket } from "./src/sockets/server.sockets.js";

const PORT = process.env.PORT || 8000;

const httpServer = http.createServer(app)
initSocket(httpServer);

connectDB().catch((error) => {
  console.error("MongoDB connection failed:", error);
  process.exit(1);
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
