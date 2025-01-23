import React, { useState } from "react";
import { Box, Modal, Typography, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const CircleButton = ({ onModelSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const categories = ["All", "Category 1", "Category 2", "Category 3"];
  const allModels = [
    { name: "Model 1", category: "Category 1", image: "https://placehold.co/200x200" },
    { name: "Model 2", category: "Category 2", image: "https://placehold.co/200x200" },
    { name: "Model 3", category: "Category 3", image: "https://placehold.co/200x200" },
    { name: "Model 4", category: "Category 1", image: "https://placehold.co/200x200" },
    { name: "Model 5", category: "Category 2", image: "https://placehold.co/200x200" },
    { name: "Model 6", category: "Category 3", image: "https://placehold.co/200x200" },
  ];

  const filteredModels =
    selectedCategory === "All"
      ? allModels
      : allModels.filter((model) => model.category === selectedCategory);

  return (
    <>
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
          fontWeight: "bold",
          fontSize: "1.2rem",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          cursor: "pointer",
          zIndex: 9999,
          "&:hover": {
            backgroundColor: "#13656e",
          },
          transition: "all 0.3s ease",
        }}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faBars} />
      </Box>

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
            maxWidth: "600px",
            maxHeight: "80%",
            overflowY: "auto",
          }}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}
          >
            Select a Model
          </Typography>

          {/* Category Selector */}
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

          {/* Filtered Models */}
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
              gap: "15px",
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
