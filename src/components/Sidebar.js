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
        backgroundColor: "#f4f4f4",
        boxShadow: "-2px 0px 5px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        padding: "20px",
        gap: "20px",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold", color: "#333" }}>
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
              label="Breite"
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
              label="Länge"
              type="number"
              value={modelSettings.scaleY}
              onChange={(e) =>
                onSettingsChange({ ...modelSettings, scaleY: parseFloat(e.target.value) })
              }
              variant="outlined"
              size="small"
              fullWidth
            />
          </>
        )}

        {currentStep === 1 && (
          <>
            <Typography variant="body1">Lichttemperatur</Typography>
            <Select
              value={modelSettings.lightTemperature || '2000K'}
              onChange={(e) => onSettingsChange({ ...modelSettings, lightTemperature: e.target.value })}
              fullWidth
            >
              <MenuItem value="2000K">2K</MenuItem>
              <MenuItem value="3000K">3K</MenuItem>
              <MenuItem value="6000K">6K</MenuItem>
            </Select>

            <Typography variant="body1">Lichtfarbe</Typography>
            <Select
              value={modelSettings.lightColor || '#FFFFFF'}
              onChange={(e) => onSettingsChange({ ...modelSettings, lightColor: e.target.value })}
              fullWidth
            >
              <MenuItem value="#FFFFFF">Weiß</MenuItem>
              <MenuItem value="#FF0000">Rot</MenuItem>
              <MenuItem value="#00FF00">Grün</MenuItem>
              <MenuItem value="#0000FF">Blau</MenuItem>
              <MenuItem value="#FFFF00">Gelb</MenuItem>
              <MenuItem value="#FF00FF">Magenta</MenuItem>
              <MenuItem value="#00FFFF">Cyan</MenuItem>
              <MenuItem value="#FFA500">Orange</MenuItem>
              <MenuItem value="#800080">Lila</MenuItem>
              <MenuItem value="#A52A2A">Braun</MenuItem>
            </Select>
          </>
        )}

        {currentStep === 2 && (
          <>
            <Typography variant="body1">Bluetooth und Soundsystem</Typography>
            <ToggleButton
              value="bluetooth"
              selected={bluetoothEnabled}
              onChange={() => setBluetoothEnabled(!bluetoothEnabled)}
              sx={{ backgroundColor: bluetoothEnabled ? "#1976d2" : "#f4f4f4", color: bluetoothEnabled ? "white" : "black" }}
            >
              Aktivieren
            </ToggleButton>

            <Typography variant="body1">Uhrentyp</Typography>
            <Select
              value={modelSettings.clockType || "analog"}
              onChange={(e) => onSettingsChange({ ...modelSettings, clockType: e.target.value })}
              fullWidth
            >
              <MenuItem value="analog">Analog</MenuItem>
              <MenuItem value="digital">Digital</MenuItem>
            </Select>

            <Typography variant="body1">Uhrposition</Typography>
            <Select
              value={modelSettings.clockPosition || "top-left"}
              onChange={(e) => onSettingsChange({ ...modelSettings, clockPosition: e.target.value })}
              fullWidth
            >
              <MenuItem value="top-left">Links oben</MenuItem>
              <MenuItem value="bottom-left">Links unten</MenuItem>
              <MenuItem value="top-right">Rechts oben</MenuItem>
              <MenuItem value="bottom-right">Rechts unten</MenuItem>
            </Select>
          </>
        )}
      </motion.div>

      <Box sx={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "40px" }}>
        {currentStep > 0 && (
          <Button
            variant="contained"
            onClick={handleBack}
            sx={{ backgroundColor: "#008493", fontWeight: "bold", color: "white", padding: "10px 20px" }}
          >
            {steps[currentStep - 1].label}
          </Button>
        )}

        {currentStep < steps.length - 1 && (
          <Button
            variant="contained"
            onClick={handleNext}
            sx={{ backgroundColor: "#008493", fontWeight: "bold", color: "white", padding: "10px 20px" }}
          >
            {steps[currentStep + 1].label}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default Sidebar;
