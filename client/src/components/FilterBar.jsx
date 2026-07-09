import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Stack,
  Card,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { Search, List } from "@mui/icons-material";

export function FilterBar({ onFilter }) {
  const [s, sets] = useState({
    destination: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    ageGroup: "",
  });

  const handleChange = (field, value) => {
    console.log(field, value);
    sets((prev) => ({ ...prev, [field]: value }));
  };

  const initialFilters = {
    destination: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    ageGroup: "",
  };

  const handleReset = () => {
    sets(initialFilters);
    onFilter(initialFilters);
  };

  const handleApplys = () => {
    const filters = Object.fromEntries(
      Object.entries(s).filter(([_, value]) => value !== ""),
    );

    onFilter(filters);
    sets(initialFilters);
  };

  return (
    <Card sx={{ p: 2, mb: 3 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <List color="primary" />
        <h3> Tours</h3>
      </Box>

      <Stack spacing={2}>
        <Stack
          direction={{ xs: "column", sm: "row" }}
          spacing={2}
          sx={{ width: "100%" }}
        >
          {/* Destination */}
          <TextField
            placeholder="Destination"
            value={s.destination}
            onChange={(e) => handleChange("destination", e.target.value)}
            fullWidth
            size="small"
          />
          {/* category */}
          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={s.category}
              onChange={(e) => handleChange("category", e.target.value)}
              label="Category"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Beach">Beach</MenuItem>
              <MenuItem value="Adventure">Adventure</MenuItem>
              <MenuItem value="Cultural">Cultural</MenuItem>
              <MenuItem value="Water Sports">Water Sports</MenuItem>
            </Select>
          </FormControl>
          {/* Age Group */}
          <FormControl fullWidth size="small">
            <InputLabel>Age Group</InputLabel>
            <Select
              value={s.ageGroup}
              onChange={(e) => handleChange("ageGroup", e.target.value)}
              label="Age Group"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="Adults Only">Adults Only</MenuItem>
              <MenuItem value="Family Friendly">Family Friendly</MenuItem>
              <MenuItem value="kids">Kids</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        {/* minprice */}
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            type="number"
            placeholder="Min Price"
            value={s.minPrice}
            onChange={(e) => handleChange("minPrice", e.target.value)}
            fullWidth
            size="small"
          />

          {/* minprice */}
          <TextField
            type="number"
            placeholder="Max Price"
            value={s.maxPrice}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
            fullWidth
            size="small"
          />

          {/* filter */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={1}
            sx={{ width: "100%" }}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplys}
              startIcon={<Search />}
              sx={{ width: { xs: "100%", sm: "auto" }, flex: 1 }}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleReset}
              sx={{ width: { xs: "100%", sm: "auto" }, flex: 1 }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
