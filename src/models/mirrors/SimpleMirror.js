import React from "react";

const SimpleMirror = ({ scale }) => {
  return (
    <mesh scale={scale}>
      <planeGeometry args={[2, 3]} />
      <meshStandardMaterial color="silver" />
    </mesh>
  );
};

export default SimpleMirror;
