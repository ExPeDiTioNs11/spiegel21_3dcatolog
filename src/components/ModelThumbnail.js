import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Box } from '@mui/material';

const Lighting = () => {
  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 5, 5]} intensity={0.8} />
    </>
  );
};

const BathroomEnvironment = () => {
  return (
    <group>
      <mesh position={[0, 1.5, -2.5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial color="#F5F5F5" roughness={0.7} metalness={0.1} />
      </mesh>
    </group>
  );
};

const ModelThumbnail = ({ modelId, width = '100%', height = 400 }) => {
  const ModelComponent = React.lazy(() => import(`../models/mirrors/${modelId}.js`));

  return (
    <Box sx={{ width, height }}>
      <Canvas
        shadows
        camera={{ position: [0, 1, 4], fov: 45 }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={["#f0f0f0"]} />
        <fog attach="fog" args={["#f0f0f0", 5, 15]} />
        <Lighting />
        <Suspense fallback={null}>
          <BathroomEnvironment />
          <ModelComponent
            scale={[1, 1, 1]}
            position={[0, 1.5, -2.3]}
            rotation={[0, Math.PI / 2, 0]}
            receiveShadow
            castShadow
          />
        </Suspense>
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
          target={[0, 1.5, -2.3]}
        />
      </Canvas>
    </Box>
  );
};

export default ModelThumbnail; 