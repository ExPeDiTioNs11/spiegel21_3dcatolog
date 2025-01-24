import React from "react";
import { Box, Typography, TextField } from "@mui/material";

const Sidebar = ({ modelSettings, onSettingsChange }) => {
  return (
    <Box
      sx={{
        width: "250px", // Sidebar width
        height: "100vh", // Full height
        position: "fixed", // Fixed position on the screen
        top: 0, // Align to the top
        right: 0, // Align to the right
        backgroundColor: "#f4f4f4", // Light gray background color
        boxShadow: "-2px 0px 5px rgba(0, 0, 0, 0.1)", // Subtle shadow for separation
        display: "flex", // Flex layout
        flexDirection: "column", // Stack items vertically
        padding: "20px", // Inner padding
        gap: "20px", // Spacing between child elements
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
        Model Settings {/* Title of the sidebar */}
      </Typography>

      {/* Input for adjusting scale on the X-axis */}
      <TextField
        label="Scale (X)" // Input label
        type="number" // Input type is number
        value={modelSettings.scaleX} // Bind input value to scaleX state
        onChange={(e) =>
          onSettingsChange({ ...modelSettings, scaleX: parseFloat(e.target.value) }) // Update scaleX on change
        }
        variant="outlined" // Material-UI input style
        size="small" // Compact input size
        fullWidth // Input takes full width of the container
      />

      {/* Input for adjusting scale on the Y-axis */}
      <TextField
        label="Scale (Y)"
        type="number"
        value={modelSettings.scaleY}
        onChange={(e) =>
          onSettingsChange({ ...modelSettings, scaleY: parseFloat(e.target.value) }) // Update scaleY on change
        }
        variant="outlined"
        size="small"
        fullWidth
      />

      {/* Input for adjusting scale on the Z-axis */}
      <TextField
        label="Scale (Z)"
        type="number"
        value={modelSettings.scaleZ}
        onChange={(e) =>
          onSettingsChange({ ...modelSettings, scaleZ: parseFloat(e.target.value) }) // Update scaleZ on change
        }
        variant="outlined"
        size="small"
        fullWidth
      />
    </Box>
  );
};

export default Sidebar;
