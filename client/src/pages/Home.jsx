import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Tabs,
  Tab,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { TourCard } from "../components/TourCard";
import { AIRecommendation } from "../components/AIRecommendation";
import { FilterBar } from "../components/FilterBar";

export const API_BASE_URL = "http://localhost:3001/api";

export function Home() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchTours();
  }, [filters]);

  const fetchTours = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/tours/search`, {
        params: filters,
      });
      setTours(response.data.tours);
    } catch (err) {
      setError("Failed to fetch tours");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (bookingData) => {
    try {
      await axios.post(`${API_BASE_URL}/tours/book`, bookingData);
      alert("Tour booked successfully!");
      fetchTours();
    } catch (err) {
      alert("Booking failed: " + err.message);
    }
  };

  const availableTours = tours.filter((t) => t.status === "available");
  const prebookedTours = tours.filter((t) => t.status === "prebooked");
  const soldOutTours = tours.filter((t) => t.status === "sold_out");

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box mb={4}>
        <Typography
          variant="h3"
          sx={{ mb: 1, fontWeight: 700, color: "#1976d2" }}
        >
          Carnival Cruise Excursions
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Discover amazing tours at each port of call
        </Typography>
      </Box>

      {/* AI Recommendation Section */}
      <AIRecommendation />

      {/* Filter Bar */}
      <FilterBar onFilter={setFilters} />

      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
        <Tabs
          value={tabValue}
          onChange={(e, newValue) => setTabValue(newValue)}
          sx={{
            "& .MuiTab-root": { fontWeight: 600 },
            "& .Mui-selected": { color: "#ff9800" },
          }}
        >
          <Tab label={`Available (${availableTours.length})`} />
          <Tab label={`Prebooked (${prebookedTours.length})`} />
          <Tab label={`Sold Out (${soldOutTours.length})`} />
        </Tabs>
      </Box>

      {/* Tours Grid */}
      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {(tabValue === 0
            ? availableTours
            : tabValue === 1
              ? prebookedTours
              : soldOutTours
          ).map((tour) => (
            <Grid item xs={12} sm={6} md={4} key={tour._id}>
              <TourCard tour={tour} onBook={handleBook} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
