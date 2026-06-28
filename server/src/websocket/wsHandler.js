import { WebSocketServer } from "ws";

export function setupWebSocket(server) {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("✅ WebSocket client connected");

    ws.on("message", async (data) => {
      try {
        const message = JSON.parse(data);

        if (message.type === "tour_update") {
          // Broadcast tour status update to all clients
          wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
              client.send(
                JSON.stringify({
                  type: "tour_updated",
                  tour: message.tour,
                }),
              );
            }
          });
        }

        if (message.type === "booking_confirmation") {
          // Send booking confirmation
          ws.send(
            JSON.stringify({
              type: "booking_confirmed",
              data: message.data,
            }),
          );
        }
      } catch (error) {
        console.error("❌ WebSocket error:", error);
      }
    });

    ws.on("close", () => {
      console.log("❌ WebSocket client disconnected");
    });
  });

  return wss;
}
