import { useState, useCallback } from "react";
import axios from "axios";

const API_BASE_URL = "http://localhost:3001/api";

export function useAIRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [streaming, setStreaming] = useState(false);

  const getRecommendations = useCallback(async (preference) => {
    try {
      setLoading(true);
      setError(null);

      // const response = await axios.post(`${API_BASE_URL}/ai/recommend`, {

      const response = await axios.post(`${API_BASE_URL}/prompt-post`, {
        preference,
      });

      // setRecommendations(response.data.recommendations || []);

      return response.data;
    } catch (err) {
      setError(err.message);
      console.error("Error fetching recommendations:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  const streamRecommendations = useCallback(async (preference, onChunk) => {
    try {
      setStreaming(true);
      setError(null);

      // const response = await fetch(`${API_BASE_URL}/ai/stream`, {

      const response = await fetch(`${API_BASE_URL}/prompt-post`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ preference }),
      });

      const reader = response.body.getReader();
      const decoder = new TextDecoder();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
          if (line.startsWith("data: ")) {
            const data = line.slice(6);
            if (data === "[DONE]") break;

            try {
              const parsed = JSON.parse(data);
              onChunk?.(parsed.content);
            } catch (e) {
              // Ignore parse errors
            }
          }
        }
      }
    } catch (err) {
      setError(err.message);
      console.error("Error streaming recommendations:", err);
    } finally {
      setStreaming(false);
    }
  }, []);

  return {
    recommendations,
    loading,
    streaming,
    error,
    getRecommendations,
    streamRecommendations,
  };
}
