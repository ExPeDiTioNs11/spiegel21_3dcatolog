import React, { useEffect, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { useLoader } from '@react-three/fiber';
import { useAnimations } from '@react-three/drei';

export default function HumanFigure({ height = 170, position = [0, 0, 0] }) {
  const group = useRef();
  const modelPath = '/models/women/rp_sophia_animated_003_idling.fbx';

  const fbx = useLoader(FBXLoader, modelPath);
  const { actions, mixer } = useAnimations(fbx.animations, group);

  // Scale calculation (adjusted for better proportions)
  const scale = (height / 170) * 0.012; // Increased base scale factor

  useEffect(() => {
    if (fbx && actions) {
      // Log available animations
      console.log('Available animations:', Object.keys(actions));
      
      // Try to play the first available animation
      const firstAnimation = Object.values(actions)[0];
      if (firstAnimation) {
        firstAnimation.reset().play();
        firstAnimation.setEffectiveTimeScale(0.5);
        firstAnimation.setEffectiveWeight(1);
        firstAnimation.clampWhenFinished = true;
      } else {
        console.warn('No animations found in the model');
      }
    }

    return () => {
      // Cleanup animations
      if (mixer) {
        mixer.stopAllAction();
      }
    };
  }, [actions, mixer, fbx]);

  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  useEffect(() => {
    if (fbx) {
      // Apply materials and textures
      fbx.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = true;
          child.receiveShadow = true;
          // Fix material issues
          if (child.material) {
            child.material.needsUpdate = true;
            child.material.transparent = true;
          }
        }
      });
    }
  }, [fbx]);

  return (
    <group 
      ref={group} 
      position={[position[0], position[1], position[2]]} 
      scale={[scale, scale, scale]}
      rotation={[0, Math.PI / 3, 0]} // Rotate the model to face the mirror at a better angle
    >
      <primitive object={fbx} />
    </group>
  );
} 