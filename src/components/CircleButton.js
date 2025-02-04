import React, { useState } from "react";
import { Box, Modal, Typography, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const CircleButton = ({ onModelSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("Alle");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  // Categories and models for selection
  const categories = ["Alle", "Category 1", "Category 2", "Category 3"];
  const allModels = [
    { name: "SimpleMirror", category: "Category 1", image: "https://placehold.co/200x200" },
    { name: "AnotherModel", category: "Category 2", image: "https://placehold.co/200x200" },
    { name: "Model3", category: "Category 3", image: "https://placehold.co/200x200" },
    { name: "Model4", category: "Category 1", image: "https://placehold.co/200x200" },
    { name: "Model5", category: "Category 2", image: "https://placehold.co/200x200" },
  ];

  // Filter models based on the selected category
  const filteredModels =
    selectedCategory === "Alle"
      ? allModels
      : allModels.filter((model) => model.category === selectedCategory);

  return (
    <>
      {/* Circle button with class for Joyride */}
      <Box
        className="circle-button" // Joyride'ın hedef alabileceği sınıf
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
          fontWeight: "bold",
          fontSize: "1.2rem",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          zIndex: 9999,
          "&:hover": {
            backgroundColor: "#13656e",
          },
        }}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faBars} />
      </Box>

      {/* Modal for model selection */}
      <Modal
        open={isOpen}
        onClose={handleClose}
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
          <Typography
            variant="h6"
            sx={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}
          >
            Wählen Sie ein Modell
          </Typography>

          {/* Dropdown to filter models by category */}
          <Select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            fullWidth
            sx={{ marginBottom: "20px" }}
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>

          {/* Grid of filtered models with images */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)", // Three items per row
              gap: "20px",
            }}
          >
            {filteredModels.map((model, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: "10px",
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
                  handleClose();
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
