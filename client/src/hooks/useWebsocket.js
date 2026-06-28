import { useEffect, useState, useRef } from "react";

export function useWebSocket(url = "ws://localhost:3001") {
  const [isConnected, setIsConnected] = useState(false);
  const [data, setData] = useState(null);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket(url);

    ws.current.onopen = () => {
      console.log("✅ WebSocket connected");
      setIsConnected(true);
    };

    ws.current.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);
        setData(message);
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
      setIsConnected(false);
    };

    ws.current.onclose = () => {
      console.log("❌ WebSocket disconnected");
      setIsConnected(false);
    };

    return () => {
      if (ws.current) ws.current.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify(message));
    }
  };

  return { isConnected, data, sendMessage };
}
