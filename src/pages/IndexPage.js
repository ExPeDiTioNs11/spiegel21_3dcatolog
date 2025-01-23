import React from "react";
import { Helmet } from "react-helmet";
import { Container, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import badspiegelImage from "../assets/images/badspiegel-540x540.jpg";

const IndexPage = () => {
  const circleStyle = {
    width: 300,
    height: 300,
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
  };

  return (
    <>
      {/* Update Browser Tab Title */}
      <Helmet>
        <title>Spiegel21</title>
      </Helmet>

      <Container
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f8f9fa",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            width: "100%",
            maxWidth: "1200px",
            gap: 10,
          }}
        >
          <Link to="/catalog" style={{ textDecoration: "none" }}>
            <Box textAlign="center">
              <Box
                sx={circleStyle}
                onMouseEnter={(e) => (e.currentTarget.style.borderWidth = "12px")}
                onMouseLeave={(e) => (e.currentTarget.style.borderWidth = "5px")}
              >
                <img
                  src={badspiegelImage}
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

          <Box textAlign="center">
            <Box
              sx={circleStyle}
              onMouseEnter={(e) => (e.currentTarget.style.borderWidth = "12px")}
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

          <Box textAlign="center">
            <Box
              sx={circleStyle}
              onMouseEnter={(e) => (e.currentTarget.style.borderWidth = "12px")}
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
