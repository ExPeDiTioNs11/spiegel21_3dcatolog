import React, { useState } from "react";
import { Box, Typography, Button, TextField, Select, MenuItem, ToggleButton } from "@mui/material";
import { motion } from "framer-motion";

const steps = [
  { key: "dimensions", label: "Größen" },
  { key: "lighting", label: "Beleuchtung" },
  { key: "smart_features", label: "Intelligente Funktionen" }
];

const Sidebar = ({ modelSettings, onSettingsChange }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [bluetoothEnabled, setBluetoothEnabled] = useState(false);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <Box
      className="sidebar-container"
      sx={{
        width: "400px",
        height: "100vh",
        position: "fixed",
        top: 0,
        right: 0,
        backgroundColor: "#f9fafb", // Daha soft bir görünüm
        boxShadow: "-2px 0px 10px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        padding: "25px",
        gap: "20px",
      }}
    >
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: "bold", 
          color: "#333", 
          textTransform: "uppercase", 
          borderBottom: "2px solid #ddd", 
          paddingBottom: "10px" 
        }}
      >
        {steps[currentStep].label}
      </Typography>

      <motion.div
        key={currentStep}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -20 }}
        transition={{ duration: 0.3 }}
      >
        {currentStep === 0 && (
          <>
            <TextField
              label="Breite (mm)"
              type="number"
              value={modelSettings.scaleX}
              onChange={(e) =>
                onSettingsChange({ ...modelSettings, scaleX: parseFloat(e.target.value) })
              }
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#008493" },
                  "&:hover fieldset": { borderColor: "#006f73" },
                },
                marginBottom: "15px",
              }}
            />

            <TextField
              label="Länge (mm)"
              type="number"
              value={modelSettings.scaleY}
              onChange={(e) =>
                onSettingsChange({ ...modelSettings, scaleY: parseFloat(e.target.value) })
              }
              variant="outlined"
              size="small"
              fullWidth
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  "& fieldset": { borderColor: "#008493" },
                  "&:hover fieldset": { borderColor: "#006f73" },
                },
                marginBottom: "15px",
              }}
            />
          </>
        )}

        {currentStep === 1 && (
          <>
            <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              Lichttemperatur
            </Typography>
            <Select
              value={modelSettings.lightTemperature || '2000K'}
              onChange={(e) => onSettingsChange({ ...modelSettings, lightTemperature: e.target.value })}
              fullWidth
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
                marginBottom: "15px",
              }}
            >
              <MenuItem value="2000K">2K</MenuItem>
              <MenuItem value="3000K">3K</MenuItem>
              <MenuItem value="6000K">6K</MenuItem>
            </Select>

            <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              Lichtfarbe
            </Typography>
            <Select
              value={modelSettings.lightColor || '#FFFFFF'}
              onChange={(e) => onSettingsChange({ ...modelSettings, lightColor: e.target.value })}
              fullWidth
              sx={{
                backgroundColor: "#ffffff",
                borderRadius: "8px",
              }}
            >
              <MenuItem value="#FFFFFF">Weiß</MenuItem>
              <MenuItem value="#FF0000">Rot</MenuItem>
              <MenuItem value="#00FF00">Grün</MenuItem>
              <MenuItem value="#0000FF">Blau</MenuItem>
              <MenuItem value="#FFFF00">Gelb</MenuItem>
            </Select>
          </>
        )}

        {currentStep === 2 && (
          <>
            <Typography variant="body1" sx={{ fontWeight: "bold", marginBottom: "10px" }}>
              Bluetooth und Soundsystem
            </Typography>
            <ToggleButton
              value="bluetooth"
              selected={bluetoothEnabled}
              onChange={() => setBluetoothEnabled(!bluetoothEnabled)}
              sx={{
                backgroundColor: bluetoothEnabled ? "#008493" : "#f4f4f4",
                color: bluetoothEnabled ? "white" : "black",
                borderRadius: "8px",
                padding: "10px 20px",
                marginBottom: "15px",
                "&:hover": { backgroundColor: bluetoothEnabled ? "#006f73" : "#e0e0e0" },
              }}
            >
              Aktivieren
            </ToggleButton>
          </>
        )}
      </motion.div>

      <Box sx={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "40px" }}>
        {currentStep > 0 && (
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{
              backgroundColor: "#008493",
              fontWeight: "bold",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#006f73" },
            }}
          >
            {steps[currentStep - 1].label}
          </Button>
        )}

        {currentStep < steps.length - 1 && (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{
              backgroundColor: "#008493",
              fontWeight: "bold",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#006f73" },
            }}
          >
            {steps[currentStep + 1].label}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
