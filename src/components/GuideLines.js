import React from 'react';
import { Html } from '@react-three/drei';
import * as THREE from 'three';

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
  
  // Metre renkleri ve ayarları
  const rulerMainColor = "#f2f2f2"; // Metre ana rengi (beyaz)
  const rulerBorderColor = "#008098"; // Metre kenar rengi (turkuaz)
  const rulerTickColor = "#222222"; // Metre çizgi rengi (siyah - daha koyu)
  const rulerWidth = 0.055; // Metrenin genişliği - biraz daha kalın
  
  // Kenar boşluğu - çerçevenin modelden ne kadar dışarıda olacağı
  const margin = 0.05;
  
  // Metre şeritleri oluşturma fonksiyonu
  const createRulerStrip = (position, isHorizontal) => {
    const rulerLength = isHorizontal 
      ? modelSettings.scaleX + margin * 2 
      : modelSettings.scaleY + margin * 2;
    
    const totalCm = isHorizontal ? modelDimensions.width : modelDimensions.height;
    
    // Metre şerit pozisyonu - pozisyon parametresi: 0=üst, 1=sağ, 2=alt, 3=sol
    let stripPosition;
    if (isHorizontal) {
      // Yatay şeritler (üst veya alt)
      stripPosition = position === 0
        ? [0, (modelSettings.scaleY / 2 + rulerWidth / 2 + 0.01), 0.01]  // üst
        : [0, -(modelSettings.scaleY / 2 + rulerWidth / 2 + 0.01), 0.01]; // alt
    } else {
      // Dikey şeritler (sol veya sağ)
      stripPosition = position === 3
        ? [-(modelSettings.scaleX / 2 + rulerWidth / 2 + 0.01), 0, 0.01]  // sol
        : [(modelSettings.scaleX / 2 + rulerWidth / 2 + 0.01), 0, 0.01];  // sağ
    }
    
    // Metre geometrisini döndürme
    const stripRotation = isHorizontal 
      ? [0, 0, 0] 
      : [0, 0, Math.PI / 2];
    
    // Metre şerit boyutları
    const stripDimensions = isHorizontal
      ? [rulerLength, rulerWidth, 0.005]
      : [rulerLength, rulerWidth, 0.005];
    
    // HTML olarak cetveli oluştur
    return (
      <group 
        key={`ruler-${isHorizontal ? 'h' : 'v'}-${position}`}
        position={stripPosition}
        rotation={stripRotation}
      >
        {/* Metre ana şeridi */}
        <mesh>
          <planeGeometry args={[stripDimensions[0], stripDimensions[1]]} />
          <meshBasicMaterial 
            color={rulerMainColor} 
            side={THREE.DoubleSide}
          />
        </mesh>
        
        {/* Metre kenar şeridi */}
        <mesh position={[0, 0, 0.001]}>
          <planeGeometry args={[stripDimensions[0], stripDimensions[1]]} />
          <meshBasicMaterial 
            color={rulerBorderColor} 
            transparent
            opacity={0.25}
            side={THREE.DoubleSide}
          >
            <primitive attach="map" object={createRulerTexture(isHorizontal, totalCm, stripDimensions[0], stripDimensions[1], position)} />
          </meshBasicMaterial>
        </mesh>
      </group>
    );
  };
  
  // Metre dokusu oluşturma fonksiyonu
  const createRulerTexture = (isHorizontal, totalCm, width, height, position) => {
    const canvas = document.createElement('canvas');
    
    // Canvas boyutları
    const canvasWidth = isHorizontal ? 2048 : 256;  // Daha yüksek çözünürlük
    const canvasHeight = isHorizontal ? 256 : 2048; // Daha yüksek çözünürlük
    
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    
    const context = canvas.getContext('2d');
    
    // Arka plan
    context.fillStyle = 'rgba(255, 255, 255, 0.1)';
    context.fillRect(0, 0, canvasWidth, canvasHeight);
    
    // Cetvel başlık alanı
    const headerHeight = isHorizontal ? canvasHeight * 0.3 : canvasWidth * 0.3;
    context.fillStyle = rulerBorderColor;
    context.globalAlpha = 0.1;
    if (isHorizontal) {
      context.fillRect(0, 0, canvasWidth, headerHeight);
    } else {
      context.fillRect(0, 0, headerHeight, canvasHeight);
    }
    context.globalAlpha = 1.0;
    
    // Cetveli çizme
    const pixelsPerCm = isHorizontal 
      ? canvasWidth / totalCm 
      : canvasHeight / totalCm;
    
    // Çizgileri çizme
    context.strokeStyle = rulerTickColor;
    
    // Sayılar için büyük font
    const fontSize = 24;
    const fontFamily = 'Arial, sans-serif';
    
    // Her mm için çizgiler (daha detaylı)
    const mmPerCm = 10;
    for (let mm = 0; mm <= totalCm * mmPerCm; mm++) {
      const pos = mm * (pixelsPerCm / mmPerCm);
      const isCm = mm % mmPerCm === 0;
      const isMajorCm = mm % (mmPerCm * 10) === 0;
      const isMidCm = mm % (mmPerCm * 5) === 0 && !isMajorCm;
      
      // Çizgi kalınlığı ayarları
      context.lineWidth = isMajorCm ? 3 : (isMidCm ? 2 : (isCm ? 1.5 : 0.8));
      
      if (isHorizontal) {
        // Yatay cetvele dikey çizgiler
        const tickHeight = isMajorCm 
          ? canvasHeight * 0.7 
          : (isMidCm ? canvasHeight * 0.5 : (isCm ? canvasHeight * 0.4 : canvasHeight * 0.25));
        
        context.beginPath();
        context.moveTo(pos, canvasHeight - tickHeight);
        context.lineTo(pos, canvasHeight);
        context.stroke();
        
        // Her 10 cm'de sayıları yazma - daha belirgin font
        if (isMajorCm) {
          const cmValue = mm / mmPerCm;
          context.fillStyle = "#000000";
          context.font = `bold ${fontSize}px ${fontFamily}`;
          context.textAlign = 'center';
          
          // Sayılar için arka plan dikdörtgeni
          const textWidth = context.measureText(cmValue).width;
          context.fillStyle = 'rgba(255, 255, 255, 0.8)';
          context.fillRect(
            pos - textWidth/2 - 4, 
            canvasHeight - tickHeight - fontSize - 8, 
            textWidth + 8, 
            fontSize + 4
          );
          
          // Sayıyı yaz
          context.fillStyle = "#000000";
          context.fillText(
            `${cmValue}`, 
            pos, 
            canvasHeight - tickHeight - 6
          );
        }
      } else {
        // Dikey cetvele yatay çizgiler
        const isRightSide = position === 1; // Sağ taraf için ters çevir
        
        const tickWidth = isMajorCm 
          ? canvasWidth * 0.7 
          : (isMidCm ? canvasWidth * 0.5 : (isCm ? canvasWidth * 0.4 : canvasWidth * 0.25));
        
        const startX = isRightSide ? 0 : canvasWidth - tickWidth;
        const endX = isRightSide ? tickWidth : canvasWidth;
        
        context.beginPath();
        context.moveTo(startX, pos);
        context.lineTo(endX, pos);
        context.stroke();
        
        // Her 10 cm'de sayıları yazma
        if (isMajorCm) {
          const cmValue = mm / mmPerCm;
          context.fillStyle = "#000000";
          context.font = `bold ${fontSize}px ${fontFamily}`;
          context.textAlign = isRightSide ? 'left' : 'right';
          
          // Sayılar için arka plan
          const textWidth = context.measureText(cmValue).width;
          const textX = isRightSide 
            ? tickWidth + 4 
            : canvasWidth - tickWidth - 4 - textWidth;
          
          context.fillStyle = 'rgba(255, 255, 255, 0.8)';
          context.fillRect(
            textX - 4, 
            pos - fontSize/2 - 2, 
            textWidth + 8, 
            fontSize + 4
          );
          
          // Sayıyı yaz
          context.fillStyle = "#000000";
          context.fillText(
            `${cmValue}`, 
            isRightSide ? tickWidth + 8 : canvasWidth - tickWidth - 8, 
            pos + fontSize/3
          );
        }
      }
    }
    
    // Ek detaylar - köşe işaretleri
    const cornerSize = 20;
    context.fillStyle = rulerBorderColor;
    
    if (isHorizontal) {
      // Yatay şerit için köşe işaretleri
      context.fillRect(0, canvasHeight - cornerSize, cornerSize, cornerSize);
      context.fillRect(canvasWidth - cornerSize, canvasHeight - cornerSize, cornerSize, cornerSize);
    } else {
      // Dikey şerit için köşe işaretleri
      const isRightSide = position === 1;
      if (isRightSide) {
        context.fillRect(0, 0, cornerSize, cornerSize);
        context.fillRect(0, canvasHeight - cornerSize, cornerSize, cornerSize);
      } else {
        context.fillRect(canvasWidth - cornerSize, 0, cornerSize, cornerSize);
        context.fillRect(canvasWidth - cornerSize, canvasHeight - cornerSize, cornerSize, cornerSize);
      }
    }
    
    // Canvas'ı dokuya çevirme
    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    
    return texture;
  };

  return (
    <group position={[x, y, z]}>
      {/* Ana çerçeve - Üst ve Alt yatay çizgiler */}
      <mesh position={[0, modelSettings.scaleY/2, 0]}>
        <boxGeometry args={[modelSettings.scaleX + margin * 2, 0.0025, 0.0025]} />
        <meshBasicMaterial color={rulerBorderColor} transparent opacity={0.7} />
      </mesh>
      <mesh position={[0, -modelSettings.scaleY/2, 0]}>
        <boxGeometry args={[modelSettings.scaleX + margin * 2, 0.0025, 0.0025]} />
        <meshBasicMaterial color={rulerBorderColor} transparent opacity={0.7} />
      </mesh>
      
      {/* Ana çerçeve - Sol ve Sağ dikey çizgiler */}
      <mesh position={[modelSettings.scaleX/2, 0, 0]}>
        <boxGeometry args={[0.0025, modelSettings.scaleY + margin * 2, 0.0025]} />
        <meshBasicMaterial color={rulerBorderColor} transparent opacity={0.7} />
      </mesh>
      <mesh position={[-modelSettings.scaleX/2, 0, 0]}>
        <boxGeometry args={[0.0025, modelSettings.scaleY + margin * 2, 0.0025]} />
        <meshBasicMaterial color={rulerBorderColor} transparent opacity={0.7} />
      </mesh>

      {/* Üst yatay metre şeridi */}
      {createRulerStrip(0, true)}
      
      {/* Alt yatay metre şeridi */}
      {createRulerStrip(2, true)}
      
      {/* Sol dikey metre şeridi */}
      {createRulerStrip(3, false)}
      
      {/* Sağ dikey metre şeridi */}
      {createRulerStrip(1, false)}

      {/* Total width label */}
      <Html position={[0, modelSettings.scaleY/2 + 0.2, 0]}>
        <div style={{ 
          background: 'rgba(255,255,255,0.9)', 
          padding: '6px 10px', 
          borderRadius: '4px',
          fontSize: '14px',
          color: rulerBorderColor,
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          border: `1px solid ${rulerBorderColor}`
        }}>
          {`${modelDimensions.width.toFixed(0)} cm`}
        </div>
      </Html>

      {/* Total height label */}
      <Html position={[-modelSettings.scaleX/2 - 0.2, 0, 0]}>
        <div style={{ 
          background: 'rgba(255,255,255,0.9)', 
          padding: '6px 10px', 
          borderRadius: '4px',
          fontSize: '14px',
          color: rulerBorderColor,
          whiteSpace: 'nowrap',
          fontWeight: 'bold',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
          border: `1px solid ${rulerBorderColor}`,
          transform: 'rotate(-90deg) translateX(-50%)',
          transformOrigin: 'left center'
        }}>
          {`${modelDimensions.height.toFixed(0)} cm`}
        </div>
      </Html>
    </group>
  );
} 