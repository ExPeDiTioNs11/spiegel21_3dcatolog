import React, { useState } from "react";
import { Box, Modal, Typography, MenuItem, Select } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const CircleButton = ({ onModelSelect }) => {
  // State to control the modal visibility
  const [isOpen, setIsOpen] = useState(false);
  
  // State to track the selected category
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Open the modal
  const handleOpen = () => setIsOpen(true);

  // Close the modal
  const handleClose = () => setIsOpen(false);

  // Define categories for filtering
  const categories = ["All", "Category 1", "Category 2", "Category 3"];

  // List of all models with their details
  const allModels = [
    { name: "Model 1", category: "Category 1", image: "https://placehold.co/200x200" },
    { name: "Model 2", category: "Category 2", image: "https://placehold.co/200x200" },
    { name: "Model 3", category: "Category 3", image: "https://placehold.co/200x200" },
    { name: "Model 4", category: "Category 1", image: "https://placehold.co/200x200" },
    { name: "Model 5", category: "Category 2", image: "https://placehold.co/200x200" },
    { name: "Model 6", category: "Category 3", image: "https://placehold.co/200x200" },
  ];

  // Filter models based on the selected category
  const filteredModels =
    selectedCategory === "All"
      ? allModels
      : allModels.filter((model) => model.category === selectedCategory);

  return (
    <>
      {/* Circle button to open modal */}
      <Box
        sx={{
          position: "fixed", // Fixed position on the screen
          top: "20px", // Distance from the top
          left: "20px", // Distance from the left
          width: "50px", // Width of the button
          height: "50px", // Height of the button
          borderRadius: "50%", // Circular shape
          backgroundColor: "#008493", // Background color
          display: "flex", // Flexbox for centering content
          alignItems: "center", // Center vertically
          justifyContent: "center", // Center horizontally
          color: "#fff", // Text color
          fontWeight: "bold", // Bold text
          fontSize: "1.2rem", // Font size
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)", // Shadow effect
          cursor: "pointer", // Pointer cursor on hover
          zIndex: 9999, // Ensure it appears on top
          transition: "all 0.3s ease", // Smooth hover effect
          "&:hover": {
            backgroundColor: "#13656e", // Hover color change
          },
        }}
        onClick={handleOpen}
      >
        <FontAwesomeIcon icon={faBars} />
      </Box>

      {/* Modal for selecting models */}
      <Modal
        open={isOpen}
        onClose={handleClose}
        sx={{
          display: "flex", // Flexbox layout
          alignItems: "center", // Center modal vertically
          justifyContent: "center", // Center modal horizontally
        }}
      >
        <Box
          sx={{
            backgroundColor: "#fff", // White background
            padding: "20px", // Padding inside the modal
            borderRadius: "8px", // Rounded corners
            boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", // Shadow effect
            width: "90%", // Responsive width
            maxWidth: "600px", // Maximum width
            maxHeight: "80%", // Limit modal height
            overflowY: "auto", // Enable scrolling for overflowing content
          }}
        >
          <Typography
            variant="h6"
            sx={{ marginBottom: "20px", fontWeight: "bold", color: "#333" }}
          >
            Select a Model {/* Modal title */}
          </Typography>

          {/* Dropdown to filter models by category */}
          <Select
            value={selectedCategory} // Bind the selected value
            onChange={(e) => setSelectedCategory(e.target.value)} // Update the state on selection
            fullWidth // Full width dropdown
            sx={{ marginBottom: "20px" }} // Spacing below dropdown
          >
            {categories.map((category, index) => (
              <MenuItem key={index} value={category}>
                {category} {/* Display category name */}
              </MenuItem>
            ))}
          </Select>

          {/* Grid of filtered models */}
          <Box
            sx={{
              display: "grid", // Grid layout
              gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", // Responsive grid columns
              gap: "15px", // Spacing between grid items
            }}
          >
            {filteredModels.map((model, index) => (
              <Box
                key={index}
                sx={{
                  display: "flex", // Flexbox layout
                  flexDirection: "column", // Stack items vertically
                  alignItems: "center", // Center items horizontally
                  gap: "10px", // Spacing between items
                  padding: "10px", // Inner padding
                  border: "1px solid #ddd", // Border around each model
                  borderRadius: "8px", // Rounded corners
                  cursor: "pointer", // Pointer cursor on hover
                  transition: "all 0.3s ease", // Smooth hover effect
                  "&:hover": {
                    backgroundColor: "#f5f5f5", // Light gray background on hover
                    transform: "scale(1.05)", // Slightly enlarge on hover
                  },
                }}
                onClick={() => {
                  onModelSelect(model.name); // Call callback with selected model name
                  handleClose(); // Close the modal
                }}
              >
                <img
                  src={model.image} // Display model image
                  alt={model.name} // Alt text for the image
                  style={{
                    width: "100%", // Full width image
                    height: "150px", // Fixed height
                    objectFit: "cover", // Maintain aspect ratio
                    borderRadius: "8px", // Rounded corners for the image
                  }}
                />
                <Typography>{model.name}</Typography> {/* Display model name */}
              </Box>
            ))}
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default CircleButton;
