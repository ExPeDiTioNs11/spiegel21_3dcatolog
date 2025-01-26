import React from "react";
import { Helmet } from "react-helmet";
import { Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import badspiegelImage from "../assets/images/badspiegel-540x540.jpg";

const IndexPage = () => {
  // Common style for circular buttons
  const circleStyle = {
    border: "5px solid #008493",
    borderRadius: "50%",
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "border-width 0.2s ease",
    backgroundColor: "#ffffff",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    cursor: "pointer",
    width: { xs: 100, sm: 150, md: 240, lg: 300 }, // iPhone SE için özel boyut
    height: { xs: 100, sm: 150, md: 240, lg: 300 }, // iPhone SE için özel boyut
  };

  return (
    <>
      {/* Update Browser Tab Title */}
      <Helmet>
        <title>Spiegel21</title>
      </Helmet>

      <Container
        sx={{
          height: "100vh", // Full height container
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa", // Light gray background color
        }}
      >
        <Box
          sx={{
            display: "flex", // Arrange items in a row
            justifyContent: "center",
            alignItems: "center",
            flexDirection: { xs: "column", sm: "column", md: "row" }, // Default direction
            width: "100%",
            maxWidth: "1200px", // Limit maximum width of the container
            gap: { xs: 3, sm: 6, md: 8, lg: 10 }, // iPhone SE için daha az boşluk
            "@media (max-width: 320px)": {
              flexDirection: "column", // Her zaman dikey sıralama
              gap: 2, // Daha küçük aralık
            },
          }}
        >
          {/* Link to Catalog Page */}
          <Link to="/catalog" style={{ textDecoration: "none" }}>
            <Box textAlign="center">
              <Box
                sx={circleStyle}
                onMouseEnter={(e) => (e.currentTarget.style.borderWidth = "10px")} // Expand border on hover
                onMouseLeave={(e) => (e.currentTarget.style.borderWidth = "5px")} // Reset border on mouse leave
              >
                <img
                  src={badspiegelImage} // Display Badspiegel catalog image
                  alt="Badspiegel catalog"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </Box>
              <Typography
                variant="h6"
                sx={{ fontWeight: "bold", color: "#343a40", marginTop: 1 }}
              >
                Badspiegel
              </Typography>
            </Box>
          </Link>

          {/* Placeholder for Title 2 */}
          <Box textAlign="center">
            <Box
              sx={circleStyle}
              onMouseEnter={(e) => (e.currentTarget.style.borderWidth = "10px")}
              onMouseLeave={(e) => (e.currentTarget.style.borderWidth = "5px")}
            >
              <img
                src="https://placehold.co/600x400"
                alt="Placeholder for Title 2"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#343a40", marginTop: 1 }}
            >
              Title 2
            </Typography>
          </Box>

          {/* Placeholder for Title 3 */}
          <Box textAlign="center">
            <Box
              sx={circleStyle}
              onMouseEnter={(e) => (e.currentTarget.style.borderWidth = "10px")}
              onMouseLeave={(e) => (e.currentTarget.style.borderWidth = "5px")}
            >
              <img
                src="https://placehold.co/600x400"
                alt="Placeholder for Title 3"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#343a40", marginTop: 1 }}
            >
              Title 3
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
};

export default IndexPage;
