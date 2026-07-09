import React from "react";
import { AppBar, Toolbar, Typography, Button, Box, Badge } from "@mui/material";
// import ShipIcon from "@mui/icons-material/Ship";
import SailingIcon from "@mui/icons-material/Sailing";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { Link, useLocation } from "react-router-dom";

export function Navbar() {
  const location = useLocation();

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Available", path: "/available" },
    { label: "Prebooked", path: "/prebooked" },
    { label: "Sold Out", path: "/sold-out" },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{ background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)" }}
    >
      <Toolbar>
        <Box display="flex" alignItems="center" gap={1} sx={{ flex: 1 }}>
          <SailingIcon sx={{ fontSize: "28px", color: "#ff9800" }} />
          <Typography variant="h5" sx={{ fontWeight: 700, color: "white" }}>
            Cruise Excursions
          </Typography>
        </Box>

        <Box
          display="flex"
          flexWrap="wrap"
          justifyContent="flex-end"
          gap={{ xs: 0.5, sm: 1.5 }}
        >
          {navItems.map((item) => (
            <Button
              key={item.path}
              component={Link}
              to={item.path}
              sx={{
                color: location.pathname === item.path ? "#ff9800" : "white",
                fontWeight: 600,
                minWidth: 90,
                paddingX: { xs: 1, sm: 2 },
                fontSize: { xs: "0.78rem", sm: "0.9rem" },
                position: "relative",
                "&:after": {
                  content: '""',
                  position: "absolute",
                  bottom: 0,
                  left: 0,
                  width: location.pathname === item.path ? "100%" : "0%",
                  height: "3px",
                  backgroundColor: "#ff9800",
                  transition: "width 0.3s ease",
                },
                "&:hover:after": {
                  width: "100%",
                },
              }}
            >
              {item.label}
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
