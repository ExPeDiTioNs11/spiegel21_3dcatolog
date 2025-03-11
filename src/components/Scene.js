import React, { useState, useEffect, Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera, useTexture, useFBX } from "@react-three/drei";
import { CircularProgress, Box, Alert, Button, Grid, IconButton } from "@mui/material";
import MeasurementRuler from "./MeasurementRuler";
import HumanFigure from './HumanFigure';
import HumanControls from './HumanControls';
import GuideLines from './GuideLines';
import { useLanguage } from '../i18n/LanguageContext';
import * as THREE from 'three';
import LightbulbIcon from '@mui/icons-material/Lightbulb';

// Table model component
const TableModel = () => {
  const fbx = useFBX('/models/roomsDesing/models/gallinera_table_4k.fbx');
  const texture = useTexture('/models/roomsDesing/models/gallinera_table_diff_4k.jpg');
  
  // Model settings
  const scale = 0.02;
  const position = [0, -1, -1.8];

  // Apply texture to all meshes of the FBX model
  fbx.traverse((child) => {
    if (child.isMesh) {
      child.material.map = texture;
      child.material.needsUpdate = true;
    }
  });

  return (
    <primitive 
      object={fbx} 
      scale={[scale, scale, scale]}
      position={position}
      rotation={[0, Math.PI, 0]}
      castShadow
      receiveShadow
    />
  );
};

// Bathroom environment component
const BathroomEnvironment = () => {
  const wallTexture = useTexture('/models/roomsDesing/texture/wall1_texture.jpg');
  const groundTexture = useTexture('/models/roomsDesing/texture/ground1_texture.jpg');
  
  wallTexture.wrapS = THREE.RepeatWrapping;
  wallTexture.wrapT = THREE.RepeatWrapping;
  wallTexture.repeat.set(2, 2);

  groundTexture.wrapS = THREE.RepeatWrapping;
  groundTexture.wrapT = THREE.RepeatWrapping;
  groundTexture.repeat.set(4, 2); // Zeminde daha fazla tekrar için

  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 1.5, -2.5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial
          map={wallTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Left wall */}
      <mesh position={[-5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial
          map={wallTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Right wall */}
      <mesh position={[5, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial
          map={wallTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Front wall (behind camera) */}
      <mesh position={[0, 1.5, 2.5]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial
          map={wallTexture}
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial
          map={groundTexture}
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>

      {/* Table Model */}
      <Suspense fallback={null}>
        <TableModel />
      </Suspense>
    </group>
  );
};

// Lighting component
const Lighting = () => {
  return (
    <>
      {/* Ambient light */}
      <ambientLight intensity={0.5} />

      {/* Main light source (simulating sunlight through window) */}
      <directionalLight
        position={[8, 8, 4]}
        intensity={0.8}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-far={20}
        shadow-camera-near={1}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={10}
        shadow-camera-bottom={-10}
      />

      {/* Soft ceiling lights */}
      <pointLight 
        position={[0, 6, -4]}
        intensity={0.3}
        castShadow
        distance={12}
        decay={2}
      />
      <pointLight 
        position={[0, 6, 0]}
        intensity={0.3}
        castShadow
        distance={12}
        decay={2}
      />

      {/* Dedicated spotlight for mirror */}
      <spotLight
        position={[0, 4, 2]}
        angle={Math.PI / 4}
        penumbra={0.3}
        intensity={0.4}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        target-position={[0, 1, -2.3]}
        distance={15}
        decay={1.5}
      />

      {/* Fill lights */}
      <pointLight 
        position={[-4, 3, -3]}
        intensity={0.25}
        distance={10}
        decay={2}
      />
      <pointLight 
        position={[4, 3, -3]}
        intensity={0.25}
        distance={10}
        decay={2}
      />
    </>
  );
};

const Scene = ({ selectedModel, modelSettings, showGuideLines, setShowGuideLines }) => {
  const { t } = useLanguage();
  const [ModelComponent, setModelComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHuman, setShowHuman] = useState(false);
  const [humanHeight, setHumanHeight] = useState(170);
  const [isLightsDimmed, setIsLightsDimmed] = useState(false);

  // Ensure modelSettings has default values
  const defaultModelSettings = {
    scaleX: 1,
    scaleY: 1,
    scaleZ: 1,
    color: '#FFFFFF'
  };

  const safeModelSettings = modelSettings || defaultModelSettings;

  const loadModel = useCallback(async () => {
    if (!selectedModel) return;
    
    setIsLoading(true);
    setError(null);

    try {
      let modelComponent;
      
      switch (selectedModel) {
        case 'Bolnuevo':
          modelComponent = await import('../models/mirrors/Bolnuevo');
          break;
        case 'm01l2v':
          modelComponent = await import('../models/mirrors/m01l2v');
          break;
        case 'SimpleMirror':
          modelComponent = await import('../models/mirrors/SimpleMirror');
          break;
        default:
          throw new Error(`Unknown model: ${selectedModel}`);
      }
      
      if (!modelComponent.default) {
        throw new Error(`Model component not found for ${selectedModel}`);
      }
      
      setModelComponent(() => modelComponent.default);
      setShowGuideLines(false);
    } catch (err) {
      console.error("Error loading model:", err);
      setError(`Error loading model (${selectedModel}). Please refresh the page or select another model.`);
    } finally {
      setIsLoading(false);
    }
  }, [selectedModel]);

  useEffect(() => {
    loadModel();
  }, [loadModel]);

  // Debug ruler state
  useEffect(() => {
    console.log('Ruler visibility:', showGuideLines);
  }, [showGuideLines]);

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas shadows gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={["#f0f0f0"]} />
        <fog attach="fog" args={["#f0f0f0", 10, 25]} />
        <Suspense fallback={null}>
          <ambientLight intensity={isLightsDimmed ? 0.2 : 1} />
          <directionalLight
            position={[5, 5, 5]}
            intensity={isLightsDimmed ? 0.3 : 1}
            castShadow
            shadow-mapSize-width={1024}
            shadow-mapSize-height={1024}
            shadow-camera-far={50}
            shadow-camera-left={-10}
            shadow-camera-right={10}
            shadow-camera-top={10}
            shadow-camera-bottom={-10}
          />
          <PerspectiveCamera
            makeDefault
            position={[0, 1.2, 8]}
            fov={28}
            near={0.1}
            far={1000}
          />
          <group>
            <BathroomEnvironment />
            {ModelComponent && (
              <ModelComponent
                scale={[
                  safeModelSettings.scaleX * 0.8,
                  safeModelSettings.scaleY * 0.8,
                  safeModelSettings.scaleZ * 0.8
                ]}
                position={[0, 1, -2.3]}
                rotation={[0, Math.PI / 2, 0]}
                color={safeModelSettings.color}
                receiveShadow
                castShadow
                material-metalness={0.9}
                material-roughness={0.1}
              />
            )}
            {showHuman && (
              <HumanFigure 
                height={humanHeight}
                position={[1.5, -1, -1.4]}
                rotation={[0, Math.PI / 4, 0]}
              />
            )}
            {showGuideLines && (
              <GuideLines 
                modelSettings={{
                  ...safeModelSettings,
                  scaleX: safeModelSettings.scaleX * 0.8,
                  scaleY: safeModelSettings.scaleY * 0.8,
                  scaleZ: safeModelSettings.scaleZ * 0.8
                }}
                selectedModel={selectedModel}
                position={[0, 1, -2.3]}
              />
            )}
          </group>
          <OrbitControls 
            makeDefault 
            minDistance={6}
            maxDistance={10}
            minPolarAngle={Math.PI / 4}
            maxPolarAngle={Math.PI / 2}
            minAzimuthAngle={-Math.PI / 4}
            maxAzimuthAngle={Math.PI / 4}
            target={[0, 1, -2.3]}
            enableDamping
            dampingFactor={0.05}
            enablePan={false}
            enableZoom={true}
            enableRotate={true}
          />
        </Suspense>
      </Canvas>

      <Grid container spacing={2} sx={{ position: 'absolute', bottom: 16, left: 16 }}>
        <Grid item>
          <HumanControls
            height={humanHeight}
            setHeight={setHumanHeight}
            isVisible={showHuman}
            setIsVisible={setShowHuman}
          />
        </Grid>
      </Grid>

      {/* Measurement Ruler Button */}
      <Box sx={{ 
        position: 'absolute', 
        top: 20, 
        right: 20, 
        zIndex: 10,
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}>
        <MeasurementRuler
          isVisible={showGuideLines}
          onToggle={() => setShowGuideLines(!showGuideLines)}
          className="MuiIconButton-circular"
          sx={{
            backgroundColor: showGuideLines ? 'primary.main' : 'background.paper',
            color: showGuideLines ? 'white' : 'primary.main',
            '&:hover': {
              backgroundColor: showGuideLines ? 'primary.dark' : 'background.default',
            },
            boxShadow: 2
          }}
        />
        <IconButton
          onClick={() => setIsLightsDimmed(!isLightsDimmed)}
          className="MuiIconButton-circular"
          sx={{
            backgroundColor: isLightsDimmed ? 'primary.main' : 'background.paper',
            color: isLightsDimmed ? 'white' : 'primary.main',
            '&:hover': {
              backgroundColor: isLightsDimmed ? 'primary.dark' : 'background.default',
            },
            boxShadow: 2
          }}
        >
          <LightbulbIcon />
        </IconButton>
      </Box>

      {/* Loading and error states */}
      {isLoading && (
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2 }}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box sx={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)", zIndex: 2, width: "80%" }}>
          <Alert severity="error">{error}</Alert>
          <Button variant="contained" onClick={loadModel} sx={{ mt: 2 }}>
            Yeniden Dene
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default Scene;
