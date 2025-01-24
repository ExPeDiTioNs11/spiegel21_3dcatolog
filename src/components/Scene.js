import React, { useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";

const Scene = ({ selectedModel, modelSettings }) => {
  const [Model, setModel] = useState(null);
  const [azimuthAngle, setAzimuthAngle] = useState(0); // Current azimuth angle

  React.useEffect(() => {
    if (selectedModel) {
      import(`../models/mirrors/${selectedModel}.js`)
        .then((module) => setModel(() => module.default))
        .catch((err) => console.error("Error loading model:", err));
    }
  }, [selectedModel]);

  const handleAzimuthClamp = (angle) => {
    const maxLimit = Math.PI / 4; // 45 degrees
    const minLimit = -Math.PI / 4; // -45 degrees
    const buffer = 0.035; // Allow 2 degrees of buffer

    if (angle > maxLimit + buffer) return maxLimit;
    if (angle < minLimit - buffer) return minLimit;
    return angle;
  };

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 50 }}> {/* Camera starts directly in front of the mirror */}
      {/* Lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      {/* Model Rendering */}
      {Model && <Model scale={[modelSettings.scaleX, modelSettings.scaleY, modelSettings.scaleZ]} />}

      {/* Orbit Controls with smooth limited rotation and snap-back */}
      <OrbitControls
        maxPolarAngle={Math.PI / 2.5} // Restrict vertical rotation to limit upward view
        minPolarAngle={Math.PI / 3} // Restrict downward rotation
        enablePan={false} // Disable panning
        enableDamping={true} // Enable damping for smoother movement
        dampingFactor={0.1} // Control damping speed
        rotateSpeed={0.8} // Adjust rotation speed
        onEnd={(e) => {
          // Snap back to the closest valid angle when mouse is released
          const currentAngle = e.target.getAzimuthalAngle();
          const clampedAngle = handleAzimuthClamp(currentAngle);

          // Only update if necessary
          if (currentAngle !== clampedAngle) {
            e.target.setAzimuthalAngle(clampedAngle);
            e.target.update(); // Ensure the controls are updated
          }
        }}
        onChange={(e) => {
          const currentAngle = e.target.getAzimuthalAngle();
          if (currentAngle !== azimuthAngle) {
            setAzimuthAngle(currentAngle); // Update state without looping
          }
        }}
      />
    </Canvas>
  );
};

export default Scene;
