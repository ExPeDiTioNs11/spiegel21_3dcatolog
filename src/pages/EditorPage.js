import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Scene from "../components/Scene";
import CircleButton from "../components/CircleButton";

const EditorPage = () => {
    // State to manage model settings such as scaling
    const [modelSettings, setModelSettings] = useState({
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
    });

    return (
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            {/* Circle Button: Used to select a model */}
            <CircleButton
                onModelSelect={(modelName) => {
                    console.log("Selected Model:", modelName);
                    // You can process the selected model and pass it to the Scene component
                }}
            />

            {/* Centered 3D Model Scene */}
            <Box
                sx={{
                    flex: 1, // Takes up remaining space
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "250px", // Space for the sidebar
                }}
            >
                <Scene modelSettings={modelSettings} />
            </Box>

            {/* Sidebar: Controls for adjusting model settings */}
            <Sidebar
                modelSettings={modelSettings}
                onSettingsChange={(newSettings) => setModelSettings(newSettings)} // Update state with new settings
            />
        </Box>
    );
};

export default EditorPage;
