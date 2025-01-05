// theme.tsx
import { createTheme } from "@mui/material/styles";
import { red } from "@mui/material/colors";

// Define the light theme
const lightTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#244bf9",
    },
    secondary: {
      main: "#757680",
    },
    error: {
      main: red.A500,
    },
  },
});

// Define the dark theme
const darkTheme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#244bf9",
    },
    secondary: {
      main: "#757680",
    },
    error: {
      main: red.A400,
    },
  },
});

export { lightTheme, darkTheme };
