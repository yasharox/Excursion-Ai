import express from "express";

const router = express.Router();

/**
 * Health Check Endpoint
 * GET /health
 *
 * Returns server status and basic system information
 */
router.get("/", (req, res) => {
  try {
    res.status(200).json({
      status: "✅ Backend is running",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || "development",
      port: process.env.PORT || 3001,
      memory: {
        used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
        total:
          Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + " MB",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "❌ Health check failed",
      error: error.message,
    });
  }
});

/**
 * Detailed Health Status
 * GET /health/detailed
 */
router.get("/detailed", (req, res) => {
  try {
    const now = Date.now();

    res.status(200).json({
      status: "healthy",
      timestamp: now,
      uptime: {
        seconds: Math.floor(process.uptime()),
        formatted: formatUptime(process.uptime()),
      },
      environment: process.env.NODE_ENV,
      api: {
        name: "Cruise Excursion AI Assistant",
        version: "1.0.0",
        endpoints: [
          "GET /health",
          "GET /api/tours",
          "POST /api/tours/book",
          "POST /api/ai/recommend",
          "POST /api/ai/stream",
        ],
      },
      services: {
        database: "MongoDB",
        ai: "OpenAI GPT-4",
        websocket: "WebSocket Server",
        realtime: "Active",
      },
      performance: {
        cpu: process.cpuUsage(),
        memory: {
          rss: Math.round(process.memoryUsage().rss / 1024 / 1024) + " MB",
          heapUsed:
            Math.round(process.memoryUsage().heapUsed / 1024 / 1024) + " MB",
          heapTotal:
            Math.round(process.memoryUsage().heapTotal / 1024 / 1024) + " MB",
          external:
            Math.round(process.memoryUsage().external / 1024 / 1024) + " MB",
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "unhealthy",
      error: error.message,
    });
  }
});

/**
 * Helper function to format uptime
 */
function formatUptime(seconds) {
  const days = Math.floor(seconds / 86400);
  const hours = Math.floor((seconds % 86400) / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  const parts = [];
  if (days > 0) parts.push(`${days}d`);
  if (hours > 0) parts.push(`${hours}h`);
  if (minutes > 0) parts.push(`${minutes}m`);
  if (secs > 0) parts.push(`${secs}s`);

  return parts.join(" ");
}

export default router;
