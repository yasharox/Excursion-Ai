import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { theme } from "./theme/theme";
import { Navbar } from "./components/Navbar";
import { Home } from "./pages/Home";
import { Available } from "./pages/Available";
import { Prebooked } from "./pages/Prebooked";
import { SoldOut } from "./pages/SoldOut";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/available" element={<Available />} />
          <Route path="/prebooked" element={<Prebooked />} />
          <Route path="/sold-out" element={<SoldOut />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
