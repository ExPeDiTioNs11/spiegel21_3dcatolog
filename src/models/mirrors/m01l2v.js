import React, { useRef } from "react";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector";

const LEDMirror = ({ scale = [3, 2, 0.1], position = [0, 0, 0] }) => {
  const mirrorRef = useRef();

  // Mirror Surface
  const mirrorGeometry = new THREE.PlaneGeometry(scale[0], scale[1]);
  const reflector = new Reflector(mirrorGeometry, {
    clipBias: 0.003,
    textureWidth: window.innerWidth * window.devicePixelRatio,
    textureHeight: window.innerHeight * window.devicePixelRatio,
    color: 0x888888,
    recursion: 1,
  });
  reflector.rotation.x = Math.PI;

  // LED Lights
  const ledMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff, emissive: 0xffffff, emissiveIntensity: 2 });
  const ledGeometry = new THREE.BoxGeometry(0.05, scale[1] * 0.9, 0.05);

  return (
    <group position={position}>
      {/* Mirror */}
      <primitive object={reflector} ref={mirrorRef} />

      {/*  LED Lights */}
      <mesh geometry={ledGeometry} material={ledMaterial} position={[-scale[0] / 2 + 0.05, 0, 0.02]} />
      <mesh geometry={ledGeometry} material={ledMaterial} position={[scale[0] / 2 - 0.05, 0, 0.02]} />
    </group>
  );
};

export default LEDMirror;
