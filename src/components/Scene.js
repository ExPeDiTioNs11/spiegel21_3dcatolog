import React, { useState, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { CircularProgress, Box } from "@mui/material";

const Scene = ({ selectedModel, modelSettings }) => {
  const [Model, setModel] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedModel) {
      setIsLoading(true);

      import(`../models/mirrors/${selectedModel}.js`)
        .then((module) => {
          setModel(() => module.default);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Error loading model:", err);
          setIsLoading(false);
        });
    }
  }, [selectedModel]);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100vh" }}>
      {isLoading && (
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
          <CircularProgress />
        </Box>
      )}

      <Canvas>
        <ambientLight intensity={0.5} />
        <Environment files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/brown_photostudio_02_4k.hdr" background={true} />
        {Model && <Model scale={[modelSettings.scaleX, modelSettings.scaleY, modelSettings.scaleZ]} />}
        <OrbitControls />
      </Canvas>
    </Box>
  );
};

export default Scene;
