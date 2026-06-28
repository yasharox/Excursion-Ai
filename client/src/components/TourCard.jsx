import React from "react";
import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Chip,
  Box,
  Rating,
  TextField,
  Stack,
} from "@mui/material";
import {
  LocationOn,
  Schedule,
  People,
  AttachMoney,
  Check,
} from "@mui/icons-material";
import { useState } from "react";

export function TourCard({ tour, onBook }) {
  const [adultsCount, setAdultsCount] = useState(1);
  const [childrenCount, setChildrenCount] = useState(0);

  const availableSpots = tour.totalSpots - tour.bookedSpots;
  const isAvailable = availableSpots > 0;

  const handleBook = () => {
    onBook({
      tourId: tour._id,
      adultsCount,
      childrenCount,
    });
    setAdultsCount(1);
    setChildrenCount(0);
  };

  const getStatusColor = () => {
    switch (tour.status) {
      case "available":
        return "success";
      case "prebooked":
        return "warning";
      case "sold_out":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusLabel = () => {
    switch (tour.status) {
      case "available":
        return "Available";
      case "prebooked":
        return "Only Prebooked";
      case "sold_out":
        return "Sold Out";
      default:
        return "Unknown";
    }
  };

  return (
    <Card sx={{ height: "100%", display: "flex", flexDirection: "column" }}>
      {/* Image */}
      <CardMedia
        component="img"
        height="200"
        image={
          tour.image || "https://via.placeholder.com/400x200?text=" + tour.title
        }
        alt={tour.title}
        sx={{ objectFit: "cover" }}
      />

      {/* Content */}
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Title & Status */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="start"
          mb={1}
        >
          <Typography variant="h5" component="h2" sx={{ flex: 1 }}>
            {tour.title}
          </Typography>
          <Chip
            label={getStatusLabel()}
            color={getStatusColor()}
            size="small"
            sx={{ ml: 1 }}
          />
        </Box>

        {/* Destination */}
        <Box display="flex" alignItems="center" gap={0.5} mb={1.5}>
          {/* <LocationOn fontSize="small" color="primary" />
           */}
          <LocationOn fontSize="small" color="primary" />

          <Typography variant="body2" color="textSecondary">
            {tour.destination}
          </Typography>
        </Box>

        {/* Rating */}
        <Box display="flex" alignItems="center" gap={1} mb={1.5}>
          <Rating value={tour.rating} readOnly size="small" />
          <Typography variant="body2" color="textSecondary">
            ({tour.reviews} reviews)
          </Typography>
        </Box>

        {/* Description */}
        <Typography variant="body2" color="textSecondary" paragraph>
          {tour.description}
        </Typography>

        {/* Duration & Time */}
        <Box display="flex" alignItems="center" gap={0.5} mb={0.5}>
          <Schedule fontSize="small" color="primary" />
          <Typography variant="body2">
            {tour.duration} • {tour.departureTime} - {tour.returnTime}
          </Typography>
        </Box>

        {/* Highlights */}
        <Box display="flex" gap={1} flexWrap="wrap" my={2}>
          {tour.highlights?.slice(0, 3).map((highlight, idx) => (
            <Chip key={idx} label={highlight} size="small" variant="outlined" />
          ))}
        </Box>

        {/* Pricing */}
        <Box mb={2}>
          <Typography variant="body2" color="textSecondary">
            <AttachMoney fontSize="small" /> Adults: ${tour.pricing.adults} |
            Children: ${tour.pricing.children}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            <People fontSize="small" /> Available Spots: {availableSpots} /{" "}
            {tour.totalSpots}
          </Typography>
        </Box>

        {/* Booking Section */}
        {isAvailable && (
          <Stack spacing={1}>
            <Stack direction="row" spacing={1}>
              <TextField
                type="number"
                label="Adults"
                value={adultsCount}
                onChange={(e) =>
                  setAdultsCount(Math.max(0, parseInt(e.target.value) || 0))
                }
                inputProps={{ min: 0, max: availableSpots }}
                size="small"
                fullWidth
              />
              <TextField
                type="number"
                label="Children"
                value={childrenCount}
                onChange={(e) =>
                  setChildrenCount(Math.max(0, parseInt(e.target.value) || 0))
                }
                inputProps={{ min: 0, max: availableSpots }}
                size="small"
                fullWidth
              />
            </Stack>
            <Typography variant="body2" color="success.main">
              Total: $
              {(
                adultsCount * tour.pricing.adults +
                childrenCount * tour.pricing.children
              ).toFixed(2)}
            </Typography>
          </Stack>
        )}
      </CardContent>

      {/* Actions */}
      <CardActions>
        <Button
          variant="contained"
          color={isAvailable ? "primary" : "error"}
          fullWidth
          onClick={handleBook}
          disabled={!isAvailable}
          startIcon={isAvailable ? <Check /> : null}
        >
          {isAvailable ? "Book Now" : "Sold Out"}
        </Button>
      </CardActions>
    </Card>
  );
}
