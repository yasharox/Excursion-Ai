import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import http from "http";
import connectDB from "./config/database.js";
import { setupWebSocket } from "./websocket/wsHandler.js";

// Routes
import tourRoutes from "./routes/tours.js";
import aiRoutes from "./routes/ai-recommendations.js";
import healthRoutes from "./routes/health.js";

dotenv.config();

const app = express();
const server = http.createServer(app);

// Middleware
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  }),
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Connect Database (Top-level await is fine in modern Node.js ES Modules)
try {
  await connectDB();
} catch (dbError) {
  console.error("❌ Database Connection Failed:", dbError);
}

// Setup WebSocket
setupWebSocket(server);

// Routes
app.use("/health", healthRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api", aiRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.json({
    message: "🚢 Cruise Excursion AI Assistant API",
    status: "✅ Running",
    endpoints: {
      health: "GET /health",
      tours: {
        all: "GET /api/tours",
        byStatus: "GET /api/tours/status/:status",
        search: "GET /api/tours/search?destination=...&category=...",
        book: "POST /api/tours/book",
      },
      ai: {
        recommend: "POST /api/ai/recommend",
        stream: "POST /api/ai/stream",
      },
    },
    websocket: `ws://localhost:${process.env.PORT || 3001}`,
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "❌ Endpoint not found",
    path: req.path,
    method: req.method,
  });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Error:", err);
  res.status(500).json({
    error: "Internal Server Error",
    message: err.message,
  });
});

// Start Server
const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════╗
║    CRUISE EXCURSION AI ASSISTANT       ║
╚════════════════════════════════════════╝

🚀 Server running on http://localhost:${PORT}
📊 Health Check: http://localhost:${PORT}/health
🌐 WebSocket: ws://localhost:${PORT}
📝 Frontend: ${process.env.FRONTEND_URL || "http://localhost:5173"}
🤖 AI: Google Gemini (via Custom Config Wrapper)
💾 Database: MongoDB
  `);
});

// Graceful Shutdown
process.on("SIGTERM", () => {
  console.log("⚠️ SIGTERM signal received: closing HTTP server");
  server.close(() => {
    console.log("✅ HTTP server closed");
  });
});

process.on("SIGINT", () => {
  console.log("⚠️ SIGINT signal received: closing HTTP server");
  server.close(() => {
    console.log("✅ HTTP server closed");
    process.exit(0);
  });
});
