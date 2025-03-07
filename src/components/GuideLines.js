import React from 'react';
import { Html } from '@react-three/drei';

export default function GuideLines({ modelSettings, selectedModel, position }) {
  if (!selectedModel) return null;

  // Calculate model dimensions
  const modelDimensions = {
    width: modelSettings.scaleX * 100,
    height: modelSettings.scaleY * 100,
    depth: modelSettings.scaleZ * 100
  };

  // Adjust position based on the model's position
  const [x, y, z] = position || [0, 1.5, -2.3];

  return (
    <group position={[x, y, z]}>
      {/* Horizontal lines */}
      <mesh position={[0, modelSettings.scaleY/2, 0]}>
        <boxGeometry args={[modelSettings.scaleX + 0.1, 0.005, 0.005]} />
        <meshStandardMaterial color="#008098" transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, -modelSettings.scaleY/2, 0]}>
        <boxGeometry args={[modelSettings.scaleX + 0.1, 0.005, 0.005]} />
        <meshStandardMaterial color="#008098" transparent opacity={0.8} />
      </mesh>
      
      {/* Vertical lines */}
      <mesh position={[modelSettings.scaleX/2, 0, 0]}>
        <boxGeometry args={[0.005, modelSettings.scaleY + 0.1, 0.005]} />
        <meshStandardMaterial color="#008098" transparent opacity={0.8} />
      </mesh>
      <mesh position={[-modelSettings.scaleX/2, 0, 0]}>
        <boxGeometry args={[0.005, modelSettings.scaleY + 0.1, 0.005]} />
        <meshStandardMaterial color="#008098" transparent opacity={0.8} />
      </mesh>

      {/* Width label */}
      <Html position={[0, modelSettings.scaleY/2 + 0.1, 0]}>
        <div style={{ 
          background: 'rgba(255,255,255,0.9)', 
          padding: '4px 8px', 
          borderRadius: '4px',
          fontSize: '12px',
          color: '#008098',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          {`${modelDimensions.width.toFixed(0)} cm`}
        </div>
      </Html>

      {/* Height label */}
      <Html position={[-modelSettings.scaleX/2 - 0.1, 0, 0]}>
        <div style={{ 
          background: 'rgba(255,255,255,0.9)', 
          padding: '4px 8px', 
          borderRadius: '4px',
          fontSize: '12px',
          color: '#008098',
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          transform: 'rotate(-90deg) translateX(-50%)',
          transformOrigin: 'left center'
        }}>
          {`${modelDimensions.height.toFixed(0)} cm`}
        </div>
      </Html>
    </group>
  );
} 