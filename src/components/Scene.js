import React, { useState, useEffect, Suspense, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, PerspectiveCamera } from "@react-three/drei";
import { CircularProgress, Box, Alert, Button, Grid } from "@mui/material";
import MeasurementRuler from "./MeasurementRuler";
import HumanFigure from './HumanFigure';
import HumanControls from './HumanControls';
import GuideLines from './GuideLines';
import { useLanguage } from '../i18n/LanguageContext';

// Bathroom environment component
const BathroomEnvironment = () => {
  return (
    <group>
      {/* Back wall */}
      <mesh position={[0, 1.5, -2.5]} rotation={[0, 0, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial
          color="#E0E0E0"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Left wall */}
      <mesh position={[-5, 1.5, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial
          color="#F5F5F5"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Right wall */}
      <mesh position={[5, 1.5, 0]} rotation={[0, -Math.PI / 2, 0]}>
        <planeGeometry args={[5, 5]} />
        <meshStandardMaterial
          color="#F5F5F5"
          roughness={0.7}
          metalness={0.1}
        />
      </mesh>

      {/* Floor */}
      <mesh position={[0, -1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[10, 5]} />
        <meshStandardMaterial
          color="#E0E0E0"
          roughness={0.8}
          metalness={0.2}
        />
      </mesh>
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

const Scene = ({ selectedModel, modelSettings }) => {
  const { t } = useLanguage();
  const [ModelComponent, setModelComponent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showHuman, setShowHuman] = useState(false);
  const [humanHeight, setHumanHeight] = useState(170);
  const [showGuideLines, setShowGuideLines] = useState(false);

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

  return (
    <Box sx={{ position: "relative", width: "100%", height: "100%" }}>
      <Canvas shadows gl={{ antialias: true, alpha: false }}>
        <color attach="background" args={["#f0f0f0"]} />
        <fog attach="fog" args={["#f0f0f0", 10, 25]} />
        <Lighting />
        <Suspense fallback={null}>
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
                position={[0.8, -1, -1.8]}
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
        zIndex: 10 
      }}>
        <MeasurementRuler
          isVisible={showGuideLines}
          onToggle={() => setShowGuideLines(!showGuideLines)}
        />
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
