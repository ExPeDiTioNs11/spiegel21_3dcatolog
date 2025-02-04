import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Scene from "../components/Scene";
import CircleButton from "../components/CircleButton";
import Joyride from "react-joyride";
import { motion, AnimatePresence } from "framer-motion";

// TourButton Componentu: 
// Eğer tur tamamlandıysa (startCountdown true) 10 saniyelik geri sayım başlar ve 2 saniyelik fade-out ile buton kaybolur.
const TourButton = ({ onClick, startCountdown, resetKey }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [visible, setVisible] = useState(true);

  // resetKey değiştiğinde geri sayımı ve görünürlüğü sıfırla
  useEffect(() => {
    setTimeLeft(10);
    setVisible(true);
  }, [resetKey]);

  useEffect(() => {
    if (startCountdown) {
      if (timeLeft > 0) {
        const timer = setInterval(() => {
          setTimeLeft((prev) => prev - 1);
        }, 1000);
        return () => clearInterval(timer);
      } else {
        // Geri sayım 0'a ulaştığında, 2 saniyelik fade-out ile butonu gizle
        const fadeTimer = setTimeout(() => {
          setVisible(false);
        }, 2000);
        return () => clearTimeout(fadeTimer);
      }
    }
  }, [startCountdown, timeLeft]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: startCountdown && timeLeft === 0 ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2 }}
          style={{ position: "absolute", bottom: 20, left: 20 }}
          className="tutorial-button"
        >
          <Button
            variant="contained"
            onClick={onClick}
            sx={{
              backgroundColor: "#008493",
              color: "white",
              padding: "10px 20px",
              borderRadius: "8px",
              "&:hover": { backgroundColor: "#006f73" },
            }}
          >
            Tour Starten {startCountdown && timeLeft > 0 ? `(${timeLeft})` : ""}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const EditorPage = () => {
  const [modelSettings, setModelSettings] = useState({
    scaleX: 2,
    scaleY: 3,
    scaleZ: 0,
  });
  const [selectedModel, setSelectedModel] = useState("SimpleMirror"); // Varsayılan model
  const [tutorialActive, setTutorialActive] = useState(false); // Eğitim turu aktif mi?
  const [tourEnded, setTourEnded] = useState(false); // Tur tamamlandı mı?
  const [tourResetKey, setTourResetKey] = useState(0); // Her yeniden başlatmada artan değer

  // Eğitim turu adımları
  const steps = [
    {
      target: ".circle-button",
      content: "Hier kannst du verschiedene Modelle auswählen.",
      disableBeacon: true,
    },
    {
      target: ".scene-container",
      content: "Das ausgewählte Modell wird hier angezeigt.",
    },
    {
      target: ".sidebar-container",
      content: "Hier kannst du die Größe und Beleuchtung des Modells anpassen.",
    },
    {
      target: ".tutorial-button",
      content:
        "Wenn du die Tour noch einmal machen möchtest, kannst du sie hier neu starten.",
    },
  ];

  // Sayfa yüklendiğinde, localStorage kontrolü ile tur otomatik başlatılır (sadece ilk ziyaret için)
  useEffect(() => {
    const tourSeen = localStorage.getItem("tourSeen");
    if (!tourSeen) {
      setTimeout(() => {
        setTutorialActive(true);
        setTourEnded(false);
      }, 500);
    }
  }, []);

  // Joyride callback: Tur tamamlandığında veya atlandığında
  const handleJoyrideCallback = (data) => {
    if (data.status === "finished" || data.status === "skipped") {
      setTutorialActive(false);
      setTourEnded(true);
      localStorage.setItem("tourSeen", "true");
    }
  };

  // Tur yeniden başlatıldığında: localStorage temizlenir ve turResetKey artar, böylece TourButton yeniden 10 saniyeden başlar
  const handleTourRestart = () => {
    localStorage.removeItem("tourSeen");
    setTutorialActive(true);
    setTourEnded(false);
    setTourResetKey((prev) => prev + 1);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Eğitim turu bileşeni */}
      <Joyride
        steps={steps}
        run={tutorialActive}
        continuous={true}
        showSkipButton={true}
        showProgress={true}
        locale={{
          back: "Zurück",
          close: "Schließen",
          last: "Fertig",
          next: "Weiter",
          skip: "Überspringen",
        }}
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: "#008493",
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

      {/* Geri sayımlı Tour Starten Butonu:
          Eğer tur tamamlanmışsa (tourEnded true) buton countdown ile görünecek.
          Butona tıklanırsa tur yeniden başlatılır */}
      <TourButton
        onClick={handleTourRestart}
        startCountdown={tourEnded}
        resetKey={tourResetKey}
      />
    </Box>
  );
};

export default EditorPage;
