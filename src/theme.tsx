// theme.tsx
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Define the light theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#385cfa",
    },
    secondary: {
      main: "#757680",
    },
    error: {
      main: red[500],
    },
  },
});

// Define the dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#385cfa",
    },
    secondary: {
      main: "#757680",
    },
    error: {
      main: red[400],
    },
  },
});

export { lightTheme, darkTheme };
