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
        // Scan and import all models with Webpack
        const context = require.context("../models", true, /\.js$/);
        const files = context.keys();

        files.forEach((path) => {
          const folderMatch = path.match(/\.\/(.*?)\//);
          const folder = folderMatch ? folderMatch[1] : "others";  

          const nameMatch = path.match(/\/([^/]+)\.js$/);
          const modelName = nameMatch ? nameMatch[1] : "Unknown";  

          if (modelFolders.includes(folder)) {
            models.push({
              name: modelName,
              category: folder,
              image: `https://placehold.co/200x200`, // Placeholder image
            });
          }
        });

        // If models array is not empty, select the first model by default
        if (models.length > 0) {
          const defaultModel = models[0];
          onModelSelect && onModelSelect(defaultModel.name, {
            scaleX: 1,
            scaleY: 1,
            scaleZ: 1,
            color: '#FFFFFF'
          });
        }
      } catch (err) {
        console.error("Error! Models could not be loaded:", err);
      }

      setAvailableModels(models);
    };

    fetchModels();
  }, [onModelSelect]);

  const handleModelSelect = (modelName) => {
    onModelSelect && onModelSelect(modelName, {
      scaleX: 1,
      scaleY: 1,
      scaleZ: 1,
      color: '#FFFFFF'
    });
    setIsOpen(false);
  };

  return (
    <>
      {/* Model Selection Button */}
      <Box
        className="circle-button"
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

      {/* Model Selection Modal */}
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
            backgroundColor: "white",
            padding: "20px",
            borderRadius: "8px",
            maxWidth: "80%",
            maxHeight: "80%",
            overflow: "auto",
          }}
        >
          <Typography variant="h6" gutterBottom>
            Select Model
          </Typography>
          
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            fullWidth
            sx={{ marginBottom: "20px" }}
          >
            <MenuItem value="Alle">All</MenuItem>
            <MenuItem value="mirrors">Mirrors</MenuItem>
            <MenuItem value="cabinets">Cabinets</MenuItem>
          </Select>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
              gap: "20px",
            }}
          >
            {availableModels
              .filter(
                (model) =>
                  selectedCategory === "Alle" ||
                  model.category === selectedCategory
              )
              .map((model) => (
                <Box
                  key={model.name}
                  onClick={() => handleModelSelect(model.name)}
                  sx={{
                    cursor: "pointer",
                    "&:hover": { opacity: 0.8 },
                  }}
                >
                  <img
                    src={model.image}
                    alt={model.name}
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "4px",
                    }}
                  />
                  <Typography variant="body2" align="center" sx={{ mt: 1 }}>
                    {model.name}
                  </Typography>
                </Box>
              ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CircleButton;
