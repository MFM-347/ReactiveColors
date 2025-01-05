import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { lightTheme, darkTheme } from "./theme";
import App from "./App";

const root = ReactDOM.createRoot(document.getElementById("root")!);

function Root() {
  const [darkMode, setDarkMode] = React.useState<boolean>(false);

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  return (
    <React.StrictMode>
      <ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
        <CssBaseline />
        <App darkMode={darkMode} onDarkModeToggle={handleDarkModeToggle} />
      </ThemeProvider>
    </React.StrictMode>
  );
}

root.render(<Root />);
