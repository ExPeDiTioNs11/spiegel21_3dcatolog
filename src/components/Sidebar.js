import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const Sidebar = ({ modelSettings, onSettingsChange }) => {
  return (
    <Box
      sx={{
        width: "250px",
        height: "100vh",
        position: "fixed",
        top: 0,
        right: 0,
        backgroundColor: "#f4f4f4",
        boxShadow: "-2px 0px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "20px",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
        Model Settings
      </Typography>

      {/* Example Input: Model Scale */}
      <TextField
        label="Scale (X)"
        type="number"
        value={modelSettings.scaleX}
        onChange={(e) =>
          onSettingsChange({ ...modelSettings, scaleX: parseFloat(e.target.value) })
        }
        variant="outlined"
        size="small"
        fullWidth
      />
      <TextField
        label="Scale (Y)"
        type="number"
        value={modelSettings.scaleY}
        onChange={(e) =>
          onSettingsChange({ ...modelSettings, scaleY: parseFloat(e.target.value) })
        }
        variant="outlined"
        size="small"
        fullWidth
      />
      <TextField
        label="Scale (Z)"
        type="number"
        value={modelSettings.scaleZ}
        onChange={(e) =>
          onSettingsChange({ ...modelSettings, scaleZ: parseFloat(e.target.value) })
        }
        variant="outlined"
        size="small"
        fullWidth
      />
    </Box>
  );
};

export default Sidebar;
