import React from "react";
import { Canvas } from "@react-three/fiber";

const Scene = ({ modelSettings }) => {
  return (
    <Canvas>
      {/* Example 3D Model */}
      <mesh scale={[modelSettings.scaleX, modelSettings.scaleY, modelSettings.scaleZ]}>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
    </Canvas>
  );
};

export default Scene;
