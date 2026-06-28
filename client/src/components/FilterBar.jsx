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
import { Search, FilterList } from "@mui/icons-material";

export function FilterBar({ onFilter }) {
  const [filters, setFilters] = useState({
    destination: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    ageGroup: "",
  });

  const handleChange = (field, value) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApplyFilters = () => {
    onFilter(filters);
  };

  const handleReset = () => {
    setFilters({
      destination: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      ageGroup: "",
    });
    onFilter({});
  };

  return (
    <Card sx={{ p: 2, mb: 3 }}>
      <Box display="flex" alignItems="center" gap={1} mb={2}>
        <FilterList color="primary" />
        <h3>Filter Tours</h3>
      </Box>

      <Stack spacing={2}>
        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            placeholder="Destination"
            value={filters.destination}
            onChange={(e) => handleChange("destination", e.target.value)}
            fullWidth
            size="small"
          />

          <FormControl fullWidth size="small">
            <InputLabel>Category</InputLabel>
            <Select
              value={filters.category}
              onChange={(e) => handleChange("category", e.target.value)}
              label="Category"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="beach">Beach</MenuItem>
              <MenuItem value="adventure">Adventure</MenuItem>
              <MenuItem value="cultural">Cultural</MenuItem>
              <MenuItem value="water">Water Sports</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth size="small">
            <InputLabel>Age Group</InputLabel>
            <Select
              value={filters.ageGroup}
              onChange={(e) => handleChange("ageGroup", e.target.value)}
              label="Age Group"
            >
              <MenuItem value="">All</MenuItem>
              <MenuItem value="adults_only">Adults Only</MenuItem>
              <MenuItem value="family">Family Friendly</MenuItem>
              <MenuItem value="kids">Kids</MenuItem>
            </Select>
          </FormControl>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
          <TextField
            type="number"
            placeholder="Min Price"
            value={filters.minPrice}
            onChange={(e) => handleChange("minPrice", e.target.value)}
            fullWidth
            size="small"
          />

          <TextField
            type="number"
            placeholder="Max Price"
            value={filters.maxPrice}
            onChange={(e) => handleChange("maxPrice", e.target.value)}
            fullWidth
            size="small"
          />

          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleApplyFilters}
              startIcon={<Search />}
              sx={{ flex: 1 }}
            >
              Filter
            </Button>
            <Button
              variant="outlined"
              color="primary"
              onClick={handleReset}
              sx={{ flex: 1 }}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Stack>
    </Card>
  );
}
