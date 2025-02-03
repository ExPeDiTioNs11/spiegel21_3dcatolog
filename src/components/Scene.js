import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Environment } from "@react-three/drei";
import { IconButton } from "@mui/material";
import LightbulbIcon from "@mui/icons-material/Lightbulb";

const Scene = ({ selectedModel, modelSettings }) => {
  const [Model, setModel] = useState(null);
  const [azimuthAngle, setAzimuthAngle] = useState(0);
  const [isLightOn, setIsLightOn] = useState(true);

  React.useEffect(() => {
    if (selectedModel) {
      import(`../models/mirrors/${selectedModel}.js`)
        .then((module) => setModel(() => module.default))
        .catch((err) => console.error("Error loading model:", err));
    }
  }, [selectedModel]);

  const handleAzimuthClamp = (angle) => {
    const maxLimit = Math.PI / 4;
    const minLimit = -Math.PI / 4;
    const buffer = 0.035;

    if (angle > maxLimit + buffer) return maxLimit;
    if (angle < minLimit - buffer) return minLimit;
    return angle;
  };

  return (
    <div style={{ position: "relative", width: "100%", height: "100vh" }}>
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }}>
        {isLightOn && <ambientLight intensity={0.5} />}
        {isLightOn && <directionalLight position={[10, 10, 10]} intensity={1} />}

        <Environment
          files="https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/4k/brown_photostudio_02_4k.hdr"
          background={true}
        />

        {Model && (
          <Model scale={[modelSettings.scaleX, modelSettings.scaleY, modelSettings.scaleZ]} />
        )}

        <OrbitControls
          maxPolarAngle={Math.PI / 2.5}
          minPolarAngle={Math.PI / 3}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.1}
          rotateSpeed={0.8}
          onEnd={(e) => {
            const currentAngle = e.target.getAzimuthalAngle();
            const clampedAngle = handleAzimuthClamp(currentAngle);
            if (currentAngle !== clampedAngle) {
              e.target.setAzimuthalAngle(clampedAngle);
              e.target.update();
            }
          }}
          onChange={(e) => {
            const currentAngle = e.target.getAzimuthalAngle();
            if (currentAngle !== azimuthAngle) {
              setAzimuthAngle(currentAngle);
            }
          }}
        />
      </Canvas>

      <IconButton
        onClick={() => setIsLightOn(!isLightOn)}
        sx={{
          position: "absolute",
          top: 20,
          right: 200,
          backgroundColor: "#fff",
          borderRadius: "50%",
          boxShadow: "0px 4px 6px rgba(0,0,0,0.1)",
          width: 50,
          height: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          zIndex: 10,
        }}
      >
        <LightbulbIcon sx={{ color: isLightOn ? "#FFD700" : "#B0B0B0" }} />
      </IconButton>
    </div>
  );
};

export default Scene;