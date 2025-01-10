import { AppBar, Toolbar, Typography, IconButton } from "@mui/material";
import { DarkMode, LightMode, GitHub } from "@mui/icons-material";

interface HeaderProps {
  darkMode: boolean;
  onDarkModeToggle: () => void;
}

export default function Nav({ darkMode, onDarkModeToggle }: HeaderProps) {
  return (
    <AppBar position="sticky" color="default" elevation={0}>
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, fontWeight: 700 }}
        >
          ShadeMaker
        </Typography>
        <IconButton onClick={onDarkModeToggle} color="inherit">
          {darkMode ? <LightMode /> : <DarkMode />}
        </IconButton>
        <IconButton
          href="https://github.com/MFM-347/ShadeMaker"
          target="_blank"
          rel="noopener"
          color="inherit"
          sx={{ mr: 1 }}
        >
          <GitHub />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
