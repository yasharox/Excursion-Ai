import React, { useState, useEffect } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Alert,
} from "@mui/material";
import axios from "axios";
import { TourCard } from "../components/TourCard";
import { FilterBar } from "../components/FilterBar";

const API_BASE_URL = "http://localhost:3001/api";

export function Available() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchAvailableTours();
  }, [filters]);

  const fetchAvailableTours = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/tours/status/available`,
        {
          params: filters,
        },
      );
      setTours(response.data.tours);
    } catch (err) {
      console.error("Failed to fetch available tours:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleBook = async (bookingData) => {
    try {
      await axios.post(`${API_BASE_URL}/tours/book`, bookingData);
      alert("Tour booked successfully!");
      fetchAvailableTours();
    } catch (err) {
      alert("Booking failed: " + err.message);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        sx={{ mb: 3, fontWeight: 700, color: "#1976d2" }}
      >
        Available Tours
      </Typography>

      <FilterBar onFilter={setFilters} />

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : tours.length === 0 ? (
        <Alert severity="info">No available tours at the moment</Alert>
      ) : (
        <Grid container spacing={3}>
          {tours.map((tour) => (
            <Grid item xs={12} sm={6} md={4} key={tour._id}>
              <TourCard tour={tour} onBook={handleBook} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
