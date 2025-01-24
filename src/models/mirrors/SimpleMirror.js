import React from "react";
import { extend } from "@react-three/fiber";
import * as THREE from "three";

// Create a simple mirror model
class SimpleMirror extends THREE.Mesh {
  constructor() {
    super(
      new THREE.BoxGeometry(2, 3, 0.1), // Frame dimensions
      new THREE.MeshStandardMaterial({ color: "silver" }) // Material for the mirror
    );
  }
}

// Extend the mirror for React Three Fiber
extend({ SimpleMirror });

const SimpleMirrorComponent = (props) => {
  return <simpleMirror {...props} />;
};

export default SimpleMirrorComponent;
