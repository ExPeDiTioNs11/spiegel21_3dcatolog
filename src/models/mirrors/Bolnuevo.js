import React, { useRef } from "react";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector";

const FramedLEDMirror = ({ scale = [3, 2, 0.1], position = [0, 0, 0] }) => {
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

  //  LED Lights frame
  const ledMaterial = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    emissive: 0xffffff,
    emissiveIntensity: 3,
    transparent: true,
    opacity: 0.8,
  });

  // Thin edges for the frame
  const frameDepth = 0.05;
  const ledGeometryHorizontal = new THREE.BoxGeometry(scale[0] + frameDepth * 2, frameDepth, frameDepth);
  const ledGeometryVertical = new THREE.BoxGeometry(frameDepth, scale[1] + frameDepth * 2, frameDepth);

  return (
    <group position={position}>
      {/* Mirror Surface */}
      <primitive object={reflector} ref={mirrorRef} />

      {/* Top and Bottom LED Frames */}
      <mesh geometry={ledGeometryHorizontal} material={ledMaterial} position={[0, scale[1] / 2 + frameDepth / 2, 0.02]} />
      <mesh geometry={ledGeometryHorizontal} material={ledMaterial} position={[0, -scale[1] / 2 - frameDepth / 2, 0.02]} />

      {/* Left and Right LED Frames */}
      <mesh geometry={ledGeometryVertical} material={ledMaterial} position={[-scale[0] / 2 - frameDepth / 2, 0, 0.02]} />
      <mesh geometry={ledGeometryVertical} material={ledMaterial} position={[scale[0] / 2 + frameDepth / 2, 0, 0.02]} />
    </group>
  );
};

export default FramedLEDMirror;
