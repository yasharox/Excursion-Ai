import React, { useState } from "react";
import {
  Paper,
  TextField,
  Button,
  Box,
  Typography,
  CircularProgress,
  Alert,
  Card,
  CardContent,
  Stack,
} from "@mui/material";

import { useAIRecommendations } from "../hooks/useAIRecommendations";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import SendIcon from "@mui/icons-material/Send";

export function AIRecommendation({ onSelectTour }) {
  const [preference, setPreference] = useState("");
  const [aiResponse, setAiResponse] = useState("");
  const { getRecommendations, streamRecommendations, loading, streaming } =
    useAIRecommendations();

  const handleGetRecommendations = async () => {
    if (!preference.trim()) return;

    setAiResponse("");

    const result = await getRecommendations(preference);

    setAiResponse(result);

    // // Use streaming for better UX
    // await streamRecommendations(preference, (chunk) => {
    //   setAiResponse((prev) => prev + chunk);
    // });
  };

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        background: "linear-gradient(135deg, #1976d2 0%, #ff9800 100%)",
      }}
    >
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <AutoAwesomeIcon sx={{ color: "white", fontSize: "28px" }} />

        <Typography variant="h5" sx={{ color: "white", fontWeight: 600 }}>
          AI Tour Advisor
        </Typography>
      </Box>

      <Typography
        variant="body2"
        sx={{ color: "rgba(255, 255, 255, 0.9)", mb: 2 }}
      >
        Tell us what you're looking for, and our AI will recommend the perfect
        tours for you!
      </Typography>

      <Stack spacing={2}>
        <TextField
          fullWidth
          multiline
          rows={3}
          placeholder="e.g., 'I want an adventure tour for 2 adults and 1 child. Looking for something with water activities and good ratings.'"
          value={preference}
          onChange={(e) => setPreference(e.target.value)}
          disabled={loading || streaming}
          sx={{
            "& .MuiInputBase-root": {
              color: "#1976d2",
              backgroundColor: "white",
            },
          }}
        />

        <Button
          variant="contained"
          color="secondary"
          size="large"
          onClick={handleGetRecommendations}
          disabled={!preference.trim() || loading || streaming}
          startIcon={streaming ? <CircularProgress size={20} /> : <SendIcon />}
          sx={{ textTransform: "none", fontWeight: 600 }}
        >
          {streaming ? "Getting Recommendations..." : "Get Recommendations"}
        </Button>
      </Stack>

      {aiResponse && (
        <Card sx={{ mt: 3, backgroundColor: "#f5f5f5" }}>
          <CardContent>
            <Typography variant="h6" gutterBottom sx={{ color: "#1976d2" }}>
              AI Recommendations
            </Typography>
            <Typography
              variant="body2"
              sx={{ whiteSpace: "pre-wrap", lineHeight: 1.8 }}
            >
              {aiResponse}
            </Typography>
          </CardContent>
        </Card>
      )}
    </Paper>
  );
}
