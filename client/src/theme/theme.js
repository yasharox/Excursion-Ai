import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Blue
      light: "#42a5f5",
      dark: "#1565c0",
    },
    secondary: {
      main: "#ff9800", // Orange
      light: "#ffb74d",
      dark: "#f57c00",
    },
    background: {
      default: "#f5f5f5",
      paper: "#ffffff",
    },
    success: {
      main: "#4caf50",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: "2.5rem",
      fontWeight: 600,
      color: "#1976d2",
    },
    h2: {
      fontSize: "2rem",
      fontWeight: 600,
      color: "#1565c0",
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
    body1: {
      fontSize: "1rem",
      lineHeight: 1.6,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: "none",
          fontWeight: 600,
          borderRadius: "8px",
        },
        containedPrimary: {
          background: "linear-gradient(135deg, #1976d2 0%, #1565c0 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #1565c0 0%, #0d47a1 100%)",
          },
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #ff9800 0%, #f57c00 100%)",
          "&:hover": {
            background: "linear-gradient(135deg, #f57c00 0%, #e65100 100%)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          transition: "all 0.3s ease",
          "&:hover": {
            boxShadow: "0 8px 12px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-4px)",
          },
        },
      },
    },
  },
});
