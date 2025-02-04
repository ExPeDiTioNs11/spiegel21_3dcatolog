import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Scene from "../components/Scene";
import CircleButton from "../components/CircleButton";
import Joyride from "react-joyride";

const EditorPage = () => {
  const [modelSettings, setModelSettings] = useState({
    scaleX: 2,
    scaleY: 3,
    scaleZ: 0,
  });

  const [selectedModel, setSelectedModel] = useState("SimpleMirror"); // Default model
  const [tutorialActive, setTutorialActive] = useState(false); // Eğitim başlangıçta çalışmasın

  // Eğitim turu adımları
  const steps = [
    {
      target: ".circle-button", // Model seçme butonu
      content: "Hier kannst du verschiedene Modelle auswählen.", // Almanca açıklama
      disableBeacon: true, // Otomatik atlamayı engelle
    },
    {
      target: ".scene-container", // 3D model sahnesi
      content: "Das ausgewählte Modell wird hier angezeigt.",
    },
    {
      target: ".sidebar-container", // Ayarları değiştirme paneli
      content: "Hier kannst du die Größe und Beleuchtung des Modells anpassen.",
    },
    {
      target: ".tutorial-button", // Eğitimi tekrar başlatma butonu
      content: "Wenn du die Tour noch einmal machen möchtest, kannst du sie hier neu starten.",
    },
  ];

  // CircleButton yüklendikten sonra eğitim turunu başlat
  useEffect(() => {
    setTimeout(() => {
      setTutorialActive(true);
    }, 500); // Küçük bir gecikme vererek Joyride'ın tüm öğeleri tanımasını sağlıyoruz
  }, []);

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Eğitim turu bileşeni */}
      <Joyride
        steps={steps}
        run={tutorialActive} // Eğitim aktifse çalıştır
        continuous={true} // Adım adım ilerlesin
        showSkipButton={true} // Kullanıcı turu atlayabilsin
        showProgress={true} // Adımların ilerleyişini göstersin
        locale={{
          back: "Zurück",
          close: "Schließen",
          last: "Fertig",
          next: "Weiter",
          skip: "Überspringen",
        }} // Butonları Almanca yaptık
        callback={(data) => {
          if (data.status === "finished" || data.status === "skipped") {
            setTutorialActive(false); // Eğitim tamamlandığında kapat
          }
        }}
        styles={{
          options: {
            primaryColor: "#008493", // Tema rengi
          },
        }}
      />

      {/* Model Seçim Butonu */}
      <CircleButton
        className="circle-button"
        onModelSelect={(modelName) => {
          console.log("Selected Model:", modelName);
          setSelectedModel(modelName);
        }}
      />

      {/* 3D Model Sahnesi */}
      <Box
        className="scene-container"
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginRight: "250px",
        }}
      >
        <Scene selectedModel={selectedModel} modelSettings={modelSettings} />
      </Box>

      {/* Sidebar: Ayarlar */}
      <Sidebar
        className="sidebar-container"
        modelSettings={modelSettings}
        onSettingsChange={(newSettings) => setModelSettings(newSettings)}
      />

      {/* Eğitimi tekrar başlatma butonu */}
      <Button
        className="tutorial-button"
        variant="contained"
        sx={{
          position: "absolute",
          bottom: 20,
          left: 20,
          backgroundColor: "#008493",
          color: "white",
        }}
        onClick={() => setTutorialActive(true)}
      >
        Tour Starten
      </Button>
    </Box>
  );
};

export default EditorPage;
