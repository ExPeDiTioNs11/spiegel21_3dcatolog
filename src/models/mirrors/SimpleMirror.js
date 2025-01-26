import React from "react";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector";

// Ayna yüzeyi sınıfı
class MirrorSurface extends Reflector {
  constructor(geometry, options = {}) {
    super(geometry, options);

    // Ayna malzemesi ayarları
    this.material.color = new THREE.Color(0x999999); // Gri renk
    this.material.roughness = 0.1; // Pürüzsüzlük
    this.material.metalness = 0.9; // Metalik görünüm
  }
}

// React Three Fiber için Reflector'u genişlet
extend({ MirrorSurface });

const SimpleMirror = ({ scale = [2, 3, 0.1], position = [0, 0, 0] }) => {
  const [sizeX, sizeY, sizeZ] = scale;

  // Geometriyi ayarlama
  const frameGeometry = React.useMemo(() => new THREE.BoxGeometry(sizeX, sizeY, sizeZ), [sizeX, sizeY, sizeZ]);
  const mirrorGeometry = React.useMemo(() => new THREE.PlaneGeometry(sizeX, sizeY), [sizeX, sizeY]);

  return (
    <>
      {/* Çerçeve */}
      <mesh geometry={frameGeometry} position={[position[0], position[1], position[2] - sizeZ / 2 - 0.05]}>
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Yansıma yüzeyi */}
      <mirrorSurface
        geometry={mirrorGeometry}
        position={position}
        rotation={[0, 0, 0]}
        args={[
          mirrorGeometry,
          {
            clipBias: 0.003,
            textureWidth: 1024,
            textureHeight: 1024,
            color: 0x777777,
            recursion: 1,
          },
        ]}
      />
    </>
  );
};

export default SimpleMirror;
