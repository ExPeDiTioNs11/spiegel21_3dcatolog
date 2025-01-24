import React from "react";
import { Canvas } from "@react-three/fiber";

const MirrorModel = ({ modelSettings }) => {
  return (
    <Canvas>
      {/* Add ambient and directional lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 10]} intensity={1} />

      {/* Create the mirror model using Three.js primitives */}
      <group scale={[modelSettings.scaleX, modelSettings.scaleY, modelSettings.scaleZ]}>
        {/* Mirror frame */}
        <mesh position={[0, 0, -0.05]}>
          <boxGeometry args={[2, 3, 0.1]} /> {/* Frame dimensions */}
          <meshStandardMaterial color="#8b8b8b" metalness={0.5} roughness={0.2} />
        </mesh>

        {/* Mirror glass */}
        <mesh position={[0, 0, 0]}>
          <planeGeometry args={[1.8, 2.8]} /> {/* Glass dimensions slightly smaller than frame */}
          <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0} />
        </mesh>
      </group>

      {/* Add a floor plane for better visualization */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]}>
        <planeGeometry args={[10, 10]} />
        <meshStandardMaterial color="#d9d9d9" />
      </mesh>
    </Canvas>
  );
};

export default MirrorModel;
