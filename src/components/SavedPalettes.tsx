import { Box, List, ListItem, ListItemText, IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material";

const SavedPalettes = ({ savedPalettes, onImportPalette, onDeletePalette }) => {
  return (
    <Box sx={{ textAlign: "center", mt: 4 }}>
      <List>
        {savedPalettes.length > 0 ? (
          savedPalettes.map((palette, index) => (
            <ListItem
              button
              key={index}
              onClick={() => onImportPalette(palette)}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <ListItemText primary={palette.name} secondary={palette.color} />
              <IconButton
                edge="end"
                onClick={(e) => {
                  e.stopPropagation();
                  onDeletePalette(index);
                }}
              >
                <Delete />
              </IconButton>
            </ListItem>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No saved palettes yet.
          </Typography>
        )}
      </List>
    </Box>
  );
};

export default SavedPalettes;
