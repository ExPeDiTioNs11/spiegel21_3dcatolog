import React from "react";
import { extend } from "@react-three/fiber";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector";

// Mirror surface class
class MirrorSurface extends Reflector {
  constructor(geometry, options = {}) {
    super(geometry, options);

    // Mirror material settings
    this.material.color = new THREE.Color(0x999999); // Gray color
    this.material.roughness = 0.1; // Smoothness
    this.material.metalness = 0.9; // Metallic look
  }
}

// Extend Reflector for React Three Fiber
extend({ MirrorSurface });

const SimpleMirror = ({ scale = [2, 3, 0.1], position = [0, 0, 0] }) => {
  const [sizeX, sizeY, sizeZ] = scale;

  // Adjusting the geometry
  const frameGeometry = React.useMemo(() => new THREE.BoxGeometry(sizeX, sizeY, sizeZ), [sizeX, sizeY, sizeZ]);
  const mirrorGeometry = React.useMemo(() => new THREE.PlaneGeometry(sizeX, sizeY), [sizeX, sizeY]);

  return (
    <>
      {/* Frame */}
      <mesh geometry={frameGeometry} position={[position[0], position[1], position[2] - sizeZ / 2 - 0.05]}>
        <meshStandardMaterial color="black" />
      </mesh>

      {/* Reflection surface */}
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
