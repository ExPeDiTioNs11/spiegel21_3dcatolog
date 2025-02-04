import React, { useState, useEffect } from "react";
import { Box, Modal, Typography, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const CircleButton = ({ onModelSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Alle");
  const [availableModels, setAvailableModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      const modelFolders = ["mirrors", "cabinets"];
      let models = [];

      try {
        // Webpack ile tüm modelleri tarayarak içe aktar
        const context = require.context("../models", true, /\.js$/);
        const files = context.keys();

        files.forEach((path) => {
          const folderMatch = path.match(/\.\/(.*?)\//);
          const folder = folderMatch ? folderMatch[1] : "others"; // Modelin klasörünü belirle

          const nameMatch = path.match(/\/([^/]+)\.js$/);
          const modelName = nameMatch ? nameMatch[1] : "Unknown"; // Modelin adını belirle

          if (modelFolders.includes(folder)) {
            models.push({
              name: modelName,
              category: folder,
              image: `https://placehold.co/200x200`, // Placeholder resim
            });
          }
        });
      } catch (err) {
        console.error("Hata! Modeller yüklenemedi:", err);
      }

      setAvailableModels(models);
    };

    fetchModels();
  }, []);

  return (
    <>
      {/* Model Seçme Butonu */}
      <Box
        sx={{
          position: "fixed",
          top: "20px",
          left: "20px",
          width: "50px",
          height: "50px",
          borderRadius: "50%",
          backgroundColor: "#008493",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#fff",
          cursor: "pointer",
          zIndex: 9999,
          "&:hover": { backgroundColor: "#13656e" },
        }}
        onClick={() => setIsOpen(true)}
      >
        <FontAwesomeIcon icon={faBars} />
      </Box>

      {/* Model Seçme Modalı */}
      <Modal
        open={isOpen}
        onClose={() => setIsOpen(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff",
            padding: "20px",
            borderRadius: "8px",
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)",
            width: "90%",
            maxWidth: "800px",
            maxHeight: "80%",
            overflowY: "auto",
          }}
        >
          <Typography variant="h6" sx={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}>
            Wählen Sie ein Modell
          </Typography>

          {/* Model Kategorileri */}
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            fullWidth
            sx={{ marginBottom: "20px" }}
          >
            <MenuItem value="Alle">Alle</MenuItem>
            {["mirrors", "cabinets"].map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>

          {/* Model Listesi */}
          <Box sx={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "20px" }}>
            {availableModels
              .filter((m) => selectedCategory === "Alle" || m.category === selectedCategory)
              .map((model) => (
                <Box
                  key={model.name}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    padding: "10px",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      transform: "scale(1.05)",
                    },
                  }}
                  onClick={() => {
                    onModelSelect(model.name);
                    setIsOpen(false);
                  }}
                >
                  <img
                    src={model.image}
                    alt={model.name}
                    style={{
                      width: "100%",
                      height: "150px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <Typography>{model.name}</Typography>
                </Box>
              ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CircleButton;
