import React, { useRef } from "react";
import { MeshStandardMaterial, MeshPhysicalMaterial, DoubleSide } from "three";
import * as THREE from "three";
import { Reflector } from "three/examples/jsm/objects/Reflector";

// Varsayılan boyut oranı: 200x130cm
const Bolnuevo = ({ scale = [2, 1.3, 1], position = [0, 0, 0], color = "silver", ledColor = "#ffffff", isLightsDimmed = false }) => {
  // LED parlaklık değeri - ışıklar kapatıldığında daha parlak
  const ledIntensity = isLightsDimmed ? 6 : 3.5;
  // LED'lerden yayılan ışıkların yoğunluğu - ışıklar kapatıldığında daha parlak
  const ledLightIntensity = isLightsDimmed ? 0.6 : 0.2;
  const mirrorRef = useRef();
  
  // Ayna Geometrisi - Yatay dikdörtgen format
  const mirrorGeometry = new THREE.PlaneGeometry(scale[0] * 0.98, scale[1] * 0.98);
  
  // LED boyutları
  const ledWidth = 0.025; // LED şeritlerin genişliği - daha da arttırıldı
  const ledDepth = 0.003; // LED şeritlerin derinliği
  const ledOffset = 0.48; // LED şeritlerin kenara olan mesafesi - arttırıldı
  
  // Reflector oluşturma - performans için kaliteyi düşürdük
  const reflector = new Reflector(mirrorGeometry, {
    clipBias: 0.003,
    textureWidth: 512, // Daha düşük çözünürlük
    textureHeight: 512, // Daha düşük çözünürlük
    color: 0xffffff,
    recursion: 0, // Yansımanın içinde yansıma olmaması için
  });
  
  // Pozisyon ayarla
  reflector.position.z = 0.003; // Daha yakın pozisyon
  
  // LED'ler için ortak materyal
  const ledMaterial = new THREE.MeshStandardMaterial({
    color: ledColor,
    emissive: ledColor,
    emissiveIntensity: ledIntensity,
    toneMapped: false
  });
  
  // LED ışık rengi
  const lightColor = new THREE.Color(ledColor);

  return (
    <group position={position}>
      {/* main frame - cam efekti - çok ince */}
      <mesh scale={scale}>
        <boxGeometry args={[1, 1, 0.002]} />
        <meshPhysicalMaterial
          color="#ffffff"
          metalness={0.1}
          roughness={0}
          transmission={0.95}
          thickness={0.002}
          transparent={true}
          opacity={0.2}
          clearcoat={1}
          clearcoatRoughness={0}
          side={DoubleSide}
        />
      </mesh>

      {/* Ayna yüzeyine LED'ler - Üst kenarda */}
      <group>
        <mesh 
          scale={[scale[0] * 0.93 + ledWidth, ledWidth, ledDepth]} 
          position={[0, scale[1] * ledOffset, 0.004]}
        >
          <boxGeometry />
          <primitive object={ledMaterial} attach="material" />
        </mesh>
        
        {/* Üst kenar LED ışık kaynağı */}
        <pointLight 
          position={[0, scale[1] * ledOffset, 0.1]} 
          distance={2} 
          intensity={ledLightIntensity}
          color={lightColor}
          decay={2}
        />
      </group>

      {/* Ayna yüzeyine LED'ler - Alt kenarda */}
      <group>
        <mesh 
          scale={[scale[0] * 0.93 + ledWidth, ledWidth, ledDepth]} 
          position={[0, -scale[1] * ledOffset, 0.004]}
        >
          <boxGeometry />
          <primitive object={ledMaterial} attach="material" />
        </mesh>
        
        {/* Alt kenar LED ışık kaynağı */}
        <pointLight 
          position={[0, -scale[1] * ledOffset, 0.1]} 
          distance={2} 
          intensity={ledLightIntensity}
          color={lightColor}
          decay={2}
        />
      </group>

      {/* Ayna yüzeyine LED'ler - Sol kenarda */}
      <group>
        <mesh 
          scale={[ledWidth, scale[1] * 0.93, ledDepth]} 
          position={[-scale[0] * ledOffset, 0, 0.004]}
        >
          <boxGeometry />
          <primitive object={ledMaterial} attach="material" />
        </mesh>
        
        {/* Sol kenar LED ışık kaynağı */}
        <pointLight 
          position={[-scale[0] * ledOffset, 0, 0.1]} 
          distance={2} 
          intensity={ledLightIntensity}
          color={lightColor}
          decay={2}
        />
      </group>

      {/* Ayna yüzeyine LED'ler - Sağ kenarda */}
      <group>
        <mesh 
          scale={[ledWidth, scale[1] * 0.93, ledDepth]} 
          position={[scale[0] * ledOffset, 0, 0.004]}
        >
          <boxGeometry />
          <primitive object={ledMaterial} attach="material" />
        </mesh>
        
        {/* Sağ kenar LED ışık kaynağı */}
        <pointLight 
          position={[scale[0] * ledOffset, 0, 0.1]} 
          distance={2} 
          intensity={ledLightIntensity}
          color={lightColor}
          decay={2}
        />
      </group>
      
      {/* LED Köşeleri - Sol Üst */}
      <group>
        <mesh
          scale={[ledWidth, ledWidth, ledDepth]}
          position={[-scale[0] * ledOffset, scale[1] * ledOffset, 0.004]}
        >
          <boxGeometry />
          <primitive object={ledMaterial} attach="material" />
        </mesh>
        
        {/* Sol üst köşe LED ışık kaynağı */}
        <pointLight 
          position={[-scale[0] * ledOffset, scale[1] * ledOffset, 0.1]} 
          distance={1.5} 
          intensity={ledLightIntensity * 0.7}
          color={lightColor}
          decay={2}
        />
      </group>
      
      {/* LED Köşeleri - Sağ Üst */}
      <group>
        <mesh
          scale={[ledWidth, ledWidth, ledDepth]}
          position={[scale[0] * ledOffset, scale[1] * ledOffset, 0.004]}
        >
          <boxGeometry />
          <primitive object={ledMaterial} attach="material" />
        </mesh>
        
        {/* Sağ üst köşe LED ışık kaynağı */}
        <pointLight 
          position={[scale[0] * ledOffset, scale[1] * ledOffset, 0.1]} 
          distance={1.5} 
          intensity={ledLightIntensity * 0.7}
          color={lightColor}
          decay={2}
        />
      </group>
      
      {/* LED Köşeleri - Sol Alt */}
      <group>
        <mesh
          scale={[ledWidth, ledWidth, ledDepth]}
          position={[-scale[0] * ledOffset, -scale[1] * ledOffset, 0.004]}
        >
          <boxGeometry />
          <primitive object={ledMaterial} attach="material" />
        </mesh>
        
        {/* Sol alt köşe LED ışık kaynağı */}
        <pointLight 
          position={[-scale[0] * ledOffset, -scale[1] * ledOffset, 0.1]} 
          distance={1.5} 
          intensity={ledLightIntensity * 0.7}
          color={lightColor}
          decay={2}
        />
      </group>
      
      {/* LED Köşeleri - Sağ Alt */}
      <group>
        <mesh
          scale={[ledWidth, ledWidth, ledDepth]}
          position={[scale[0] * ledOffset, -scale[1] * ledOffset, 0.004]}
        >
          <boxGeometry />
          <primitive object={ledMaterial} attach="material" />
        </mesh>
        
        {/* Sağ alt köşe LED ışık kaynağı */}
        <pointLight 
          position={[scale[0] * ledOffset, -scale[1] * ledOffset, 0.1]} 
          distance={1.5} 
          intensity={ledLightIntensity * 0.7}
          color={lightColor}
          decay={2}
        />
      </group>
      
      {/* Ayna etrafında genel ışık - duvara yayılım için */}
      <spotLight 
        position={[0, 0, 0.3]}
        intensity={ledLightIntensity * 1.5}
        angle={Math.PI / 2}
        penumbra={1}
        distance={5}
        decay={2}
        color={lightColor}
        target-position={[0, 0, -1]}
      />
      
      {/* Ayna - doğrudan primitive objesi */}
      <primitive object={reflector} ref={mirrorRef} />
    </group>
  );
};

export default Bolnuevo;
