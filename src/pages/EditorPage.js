import React, { useState } from "react";
import { Box } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Scene from "../components/Scene";
import CircleButton from "../components/CircleButton";

const EditorPage = () => {
    const [modelSettings, setModelSettings] = useState({
        scaleX: 1,
        scaleY: 1,
        scaleZ: 1,
    });

    return (
        <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
            {/* Circle Button */}
            <CircleButton
                onModelSelect={(modelName) => {
                    console.log("Selected Model:", modelName);
                    // Seçilen modeli işleyip Scene'e aktarabilirsiniz
                }}
            />


            {/* Centered 3D Model Scene */}
            <Box
                sx={{
                    flex: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: "250px", // Leave space for sidebar
                }}
            >
                <Scene modelSettings={modelSettings} />
            </Box>

            {/* Sidebar */}
            <Sidebar
                modelSettings={modelSettings}
                onSettingsChange={(newSettings) => setModelSettings(newSettings)}
            />
        </Box>
    );
};

export default EditorPage;
