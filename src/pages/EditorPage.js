import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Scene from "../components/Scene";
import CircleButton from "../components/CircleButton";

const EditorPage = () => {
  const [modelSettings, setModelSettings] = useState({
    scaleX: 2,
    scaleY: 3,
    scaleZ: 0,
  });

  const [selectedModel, setSelectedModel] = useState("SimpleMirror"); // Default model

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Circle Button: Used to select a model */}
      <CircleButton
        onModelSelect={(modelName) => {
          console.log("Selected Model:", modelName);
          setSelectedModel(modelName); // Update selected model
        }}
      />

      {/* Centered 3D Model Scene */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "250px",
        }}
      >
        <Scene selectedModel={selectedModel} modelSettings={modelSettings} />
      </Box>

      {/* Sidebar: Controls for adjusting model settings */}
      <Sidebar
        modelSettings={modelSettings}
        onSettingsChange={(newSettings) => setModelSettings(newSettings)}
      />
    </Box>
  );
};

export default EditorPage;
