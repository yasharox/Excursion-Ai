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

export function SoldOut() {
  const [tours, setTours] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    fetchSoldOutTours();
  }, [filters]);

  const fetchSoldOutTours = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${API_BASE_URL}/tours/status/sold_out`,
        {
          params: filters,
        },
      );
      setTours(response.data.tours);
    } catch (err) {
      console.error("Failed to fetch sold out tours:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography
        variant="h3"
        sx={{ mb: 3, fontWeight: 700, color: "#d32f2f" }}
      >
        Sold Out Tours
      </Typography>

      <FilterBar onFilter={setFilters} />

      {loading ? (
        <Box display="flex" justifyContent="center" py={4}>
          <CircularProgress />
        </Box>
      ) : tours.length === 0 ? (
        <Alert severity="success">No sold out tours!</Alert>
      ) : (
        <Grid container spacing={3}>
          {tours.map((tour) => (
            <Grid item xs={12} sm={6} md={4} key={tour._id}>
              <TourCard tour={tour} onBook={() => {}} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
}
