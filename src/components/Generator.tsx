import { useState, useEffect } from "react";
import {
  Box,
  Typography,
  TextField,
  IconButton,
  Snackbar,
  Alert,
  Stack,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { Autorenew, ContentCopy, Save } from "@mui/icons-material";
import tinycolor from "tinycolor2";
import { isDark } from "../utils";
import Saved from "./Saved";

export default function Generator({ color, shades, onColorChange }) {
  useEffect(() => {
    const handleKeyPress = (e) => e.code === "Space" && random();
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, []);

  const [snack, setSnack] = useState({ open: false, text: "" });
  const [savedPalettes, setSavedPalettes] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem("palettes")) || [];
    setSavedPalettes(saved);
  }, []);
  const update = (e) => {
    const newColor = e.target.value;
    onColorChange(newColor);
  };

  const random = () => {
    const randColor = tinycolor.random().toHexString();
    onColorChange(randColor);
  };

  const copy = (hex) => {
    navigator.clipboard.writeText(hex);
    setSnack({ open: true, text: `Copied ${hex}` });
  };

  const copyAll = (shades) => {
    const shadeKeys = Object.keys(shades);
    const shadeCode = {
      color: {
        "50": shades[shadeKeys[0]],
        "100": shades[shadeKeys[1]],
        "200": shades[shadeKeys[2]],
        "300": shades[shadeKeys[3]],
        "400": shades[shadeKeys[4]],
        "500": shades[shadeKeys[5]],
        "600": shades[shadeKeys[6]],
        "700": shades[shadeKeys[7]],
        "800": shades[shadeKeys[8]],
        "900": shades[shadeKeys[9]],
        "950": shades[shadeKeys[10]],
      },
    };
    const shadeCodeString = JSON.stringify(shadeCode, null, 2);
    navigator.clipboard
      .writeText(shadeCodeString)
      .then(() => setSnack({ open: true, text: "All shades copied!" }))
      .catch(() => setSnack({ open: true, text: "Failed to copy shades" }));
  };
  const savePalette = () => {
    if (savedPalettes.some((palette) => palette.color === color)) {
      setSnack({ open: true, text: "This palette is already saved!" });
      return;
    }
    const newPalette = {
      color,
      shades,
      name: `Palette ${savedPalettes.length + 1}`,
    };
    const updatedPalettes = [...savedPalettes, newPalette];
    setSavedPalettes(updatedPalettes);
    localStorage.setItem("palettes", JSON.stringify(updatedPalettes));
    setSnack({ open: true, text: "Palette saved!" });
  };
  const deletePalette = (index) => {
    const updatedPalettes = savedPalettes.filter((_, i) => i !== index);
    setSavedPalettes(updatedPalettes);
    localStorage.setItem("palettes", JSON.stringify(updatedPalettes));
    setSnack({ open: true, text: "Palette deleted!" });
  };
  const openAModal = () => setOpenModal(true);
  const closeAModal = () => setOpenModal(false);
  return (
    <Box sx={{ textAlign: "center", mb: 8 }}>
      <Typography variant="h2" sx={{ fontWeight: 700, mb: 2 }}>
        TW Shade Generator
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" sx={{ mb: 4 }}>
        Press spacebar for random colors or enter a hex code to generate shades
      </Typography>
      <Box
        sx={{
          my: 4,
          display: "flex",
          justifyContent: "center",
          gap: 1.5,
          w: "80%",
        }}
      >
        <Box
          sx={{
            width: 32,
            height: 32,
            borderRadius: "50%",
            bgcolor: color,
            mr: 1,
            border: "2px solid",
            borderColor: "divider",
          }}
        />
        <TextField
          value={color}
          onChange={update}
          size="small"
          sx={{ width: "100%" }}
        />
        <IconButton size="small" onClick={random}>
          <Autorenew />
        </IconButton>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: 2,
          mb: 4,
        }}
      >
        {Object.keys(shades).map((key) => (
          <Box
            key={key}
            sx={{
              py: 6,
              px: 4,
              borderRadius: 2,
              backgroundColor: shades[key],
              display: "grid",
              PlaceItems: "center",
              gap: 1,
              textAlign: "center",
              color: isDark(shades[key]) ? "white" : "black",
              fontSize: "0.8rem",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              transition: "transform 0.2s ease-in-out",
              cursor: "pointer",
              "&:hover": {
                transform: "scale(1.05)",
              },
            }}
            onClick={() => copy(shades[key])}
          >
            <Typography>{key}</Typography>
            <Typography>{shades[key]}</Typography>
          </Box>
        ))}
      </Box>
      <Stack direction="row" spacing={2} justifyContent="center">
        <Button
          variant="outlined"
          onClick={() => copyAll(shades)}
          startIcon={<ContentCopy />}
        >
          Copy All
        </Button>
        <Button variant="contained" onClick={savePalette} startIcon={<Save />}>
          Save Palette
        </Button>
        <Button variant="text" onClick={openAModal}>
          Show Saved Palettes
        </Button>
      </Stack>
      <Snackbar
        open={snack.open}
        autoHideDuration={2000}
        onClose={() => setSnack({ ...snack, open: false })}
      >
        <Alert severity="success" sx={{ width: "100%" }}>
          {snack.text}
        </Alert>
      </Snackbar>
      <Dialog open={openModal} onClose={closeAModal}>
        <DialogTitle>Saved Palettes</DialogTitle>
        <DialogContent>
          <Saved
            savedPalettes={savedPalettes}
            onImportPalette={(palette) => onColorChange(palette.color)}
            onDeletePalette={deletePalette}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeAModal}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
