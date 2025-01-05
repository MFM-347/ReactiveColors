import { useState, useMemo } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { Box, Container, useMediaQuery } from "@mui/material";
import Header from "./components/Header";
import Generator from "./components/Generator";
import Examples from "./components/Examples";
import { generateShade, prClr } from "./utils";

export default function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [darkMode, setDarkMode] = useState(prefersDarkMode);
  const [color, setColor] = useState(prClr);
  const [shades, setShades] = useState(generateShade(color));

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? "dark" : "light",
        },
      }),
    [darkMode],
  );

  const handleColorChange = (newColor) => {
    setColor(newColor);
    setShades(generateShade(newColor));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
        <Header
          darkMode={darkMode}
          onDarkModeToggle={() => setDarkMode(!darkMode)}
        />
        <Container maxWidth="lg" sx={{ pt: 4, pb: 8 }}>
          <Generator
            color={color}
            onColorChange={handleColorChange}
            shades={shades}
          />
          <Examples shades={shades} />
        </Container>
      </Box>
    </ThemeProvider>
  );
}
