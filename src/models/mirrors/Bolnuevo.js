import React from "react";
import { MeshStandardMaterial } from "three";

const Bolnuevo = ({ scale = [1, 1, 1], position = [0, 0, 0], color = "silver" }) => {
  // Basit bir ayna geometrisi oluşturalım
  return (
    <group position={position}>
      {/* Ayna çerçevesi */}
      <mesh scale={scale}>
        <boxGeometry args={[1, 1, 0.05]} />
        <meshStandardMaterial
          color={color === "gold" ? "#FFD700" : color === "bronze" ? "#CD7F32" : "#C0C0C0"}
          metalness={0.9}
          roughness={0.1}
        />
      </mesh>
      
      {/* Ayna yüzeyi */}
      <mesh scale={[scale[0] * 0.95, scale[1] * 0.95, 0.01]} position={[0, 0, 0.03]}>
        <planeGeometry />
        <meshStandardMaterial
          color="#ffffff"
          metalness={0.9}
          roughness={0.05}
          envMapIntensity={1}
        />
      </mesh>
    </group>
  );
};

export default Bolnuevo;
