import React, { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import Sidebar from "../components/Sidebar";
import Scene from "../components/Scene";
import CircleButton from "../components/CircleButton";
import Joyride from "react-joyride";
import { motion, AnimatePresence } from "framer-motion";

// TourButton Component: 
// If the round is completed (startCountdown true) a 10 second countdown begins and the button disappears with a 2 second fade-out.
const TourButton = ({ onClick, startCountdown, resetKey }) => {
  const [timeLeft, setTimeLeft] = useState(10);
  const [visible, setVisible] = useState(true);

  // Reset countdown and visibility when resetKey changes
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
        // When countdown reaches 0, hide button with 2 seconds fade-out
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
  const [selectedModel, setSelectedModel] = useState("SimpleMirror"); // Default model
  const [tutorialActive, setTutorialActive] = useState(false); // Is the training tour active?
  const [tourEnded, setTourEnded] = useState(false); // Is the tour complete?
  const [tourResetKey, setTourResetKey] = useState(0); // Increasing value on each restart

  // Training tour steps
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

  // When the page loads, the tour is automatically started with the localStorage control (only for the first visit)
  useEffect(() => {
    const tourSeen = localStorage.getItem("tourSeen");
    if (!tourSeen) {
      setTimeout(() => {
        setTutorialActive(true);
        setTourEnded(false);
      }, 500);
    }
  }, []);

  // Joyride callback: When a round is completed or skipped
  const handleJoyrideCallback = (data) => {
    if (data.status === "finished" || data.status === "skipped") {
      setTutorialActive(false);
      setTourEnded(true);
      localStorage.setItem("tourSeen", "true");
    }
  };

  // When the tour is restarted: localStorage is cleared and tourResetKey is incremented, so the TourButton starts again from 10 seconds
  const handleTourRestart = () => {
    localStorage.removeItem("tourSeen");
    setTutorialActive(true);
    setTourEnded(false);
    setTourResetKey((prev) => prev + 1);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
      {/* Educational tour component */}
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

      {/* Model Selection Button */}
      <CircleButton
        className="circle-button"
        onModelSelect={(modelName) => {
          console.log("Selected Model:", modelName);
          setSelectedModel(modelName);
        }}
      />

      {/* 3D Model Scene */}
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

      {/* Sidebar: Settings */}
      <Sidebar
        className="sidebar-container"
        modelSettings={modelSettings}
        onSettingsChange={(newSettings) => setModelSettings(newSettings)}
      />

      {/* Countdown Tour Start Button:
          If the tour is completed (tourEnded true) the button will appear with countdown.
          If the button is clicked, the tour will restart */}
      <TourButton
        onClick={handleTourRestart}
        startCountdown={tourEnded}
        resetKey={tourResetKey}
      />
    </Box>
  );
};

export default EditorPage;
