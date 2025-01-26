import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTools, faBars } from "@fortawesome/free-solid-svg-icons";
import "./../assets/css/styles.css";

const CatalogPage = () => {
  const [isScrolled, setIsScrolled] = useState(false); // State to track scroll position
  const [menuOpen, setMenuOpen] = useState(false); // State to track mobile menu open/close

  const navigate = useNavigate();

  // Detect scroll position to update button styles
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 100);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Add animations to sections when they come into view
  useEffect(() => {
    const sections = document.querySelectorAll(".content-section");

    const observerOptions = {
      root: null,
      threshold: 0.1, // Trigger animation when 10% of the section is visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");
        } else {
          entry.target.classList.remove("show");
        }
      });
    }, observerOptions);

    sections.forEach((section) => observer.observe(section));
    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  // Circle styling for side buttons
  const circleStyle = {
    width: 150,
    height: 150,
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

  // Toggle mobile menu
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <Helmet>
        <title>Spiegel21 Katalog</title> {/* Set page title */}
      </Helmet>

      {/* Scroll-Aware Floating Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: isScrolled ? "20px" : "30px",
          left: isScrolled ? "20px" : "50%",
          transform: isScrolled ? "translateX(0)" : "translateX(-50%)",
          backgroundColor: "#008493",
          color: "white",
          borderRadius: "30px",
          padding: isScrolled ? "10px 20px" : "15px 30px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 9999,
          cursor: "pointer",
          fontSize: isScrolled ? "1rem" : "1.25rem",
          fontWeight: "bold",
          textAlign: "center",
          transition: "all 0.3s ease",
          "&:hover": {
            backgroundColor: "#13656e",
          },
        }}
        onClick={() => navigate('/editor')} // Navigate to the editor page
      >
        <FontAwesomeIcon
          icon={faTools}
          style={{
            marginRight: "15px",
            fontSize: isScrolled ? "1.2rem" : "1.5rem",
            animation: "spin 5s linear infinite",
          }}
        />
        <Typography
          sx={{
            display: "flex",
            alignItems: "center",
            lineHeight: 1,
          }}
        >
          3D Konfigurator
        </Typography>
      </Box>

      {/* Fixed Side Circles */}
      <Box
        sx={{
          position: "fixed",
          top: "30%",
          right: "20px",
          display: { xs: "none", md: "flex" }, // Show only on medium screens and above
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          zIndex: 9999,
        }}
      >
        {["Category 2", "Category 3"].map((title, index) => (
          <Box textAlign="center" key={index}>
            <Box
              sx={circleStyle}
              onMouseEnter={(e) => (e.currentTarget.style.borderWidth = "8px")}
              onMouseLeave={(e) => (e.currentTarget.style.borderWidth = "5px")}
            >
              <img
                src="https://placehold.co/600x400"
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#343a40", marginTop: 1 }}
            >
              {title}
            </Typography>
          </Box>
        ))}
      </Box>

      {/* Mobile Menu Button */}
      <Box
        sx={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          display: { xs: "flex", md: "none" }, // Show only on small screens
          alignItems: "center",
          zIndex: 9999,
        }}
      >
        <Button
          variant="contained"
          onClick={toggleMenu}
          sx={{
            backgroundColor: "#008493",
            color: "white",
            borderRadius: "50%",
            width: "60px",
            height: "60px",
            minWidth: "unset",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            "&:hover": {
              backgroundColor: "#13656e",
            },
          }}
        >
          <FontAwesomeIcon icon={faBars} />
        </Button>
      </Box>

      {menuOpen && (
        <Box
          sx={{
            position: "fixed",
            top: "0",
            right: "0",
            width: "300px",
            height: "100vh",
            backgroundColor: "#f8f9fa",
            boxShadow: "-4px 0 10px rgba(0, 0, 0, 0.2)",
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: 3,
            zIndex: 9998,
            transform: menuOpen ? "translateX(0)" : "translateX(100%)",
            transition: "transform 0.3s ease-in-out",
          }}
        >
          {["Category 2", "Category 3"].map((title, index) => (
            <Box
              key={index}
              sx={{
                ...circleStyle,
                margin: "0 auto",
              }}
            >
              <img
                src="https://placehold.co/600x400"
                alt={title}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                }}
              />
            </Box>
          ))}
        </Box>
      )}

      {/* Banner Section */}
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: { xs: "50vh", md: "100vh" },
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src="https://placehold.co/1920x1080"
          alt="Banner Image"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            color: "white",
            textAlign: "center",
            textShadow: "0px 0px 15px rgba(0, 0, 0, 0.8)",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: "2rem", md: "3rem" },
              fontWeight: 700,
              fontFamily: "Playfair Display",
            }}
          >
            Willkommen im Spiegel21-Katalog
          </Typography>
        </Box>
      </Box>

      {/* Content Sections */}
      {[...Array(4)].map((_, index) => (
        <Container
          key={index}
          className="content-section"
          sx={{
            py: 5,
            fontFamily: "Roboto",
            opacity: 0,
            transform: "translateY(50px)",
            transition: "all 0.5s ease-in-out",
          }}
        >
          <Grid
            container
            spacing={4}
            alignItems="center"
            direction={index % 2 === 1 ? "row-reverse" : "row"}
          >
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="https://placehold.co/600x400"
                alt={`Sample Image ${index + 1}`}
                sx={{ width: "100%", borderRadius: 2, boxShadow: 3 }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {index % 2 === 0
                  ? "Badezimmerspiegel nach Maß - Bolnuevo"
                  : "Ein weiterer Abschnitt zur Präsentation Ihrer Produkt- oder Dienstleistungsvielfalt."}
              </Typography>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: "#008493",
                  color: "white",
                  borderRadius: "5px",
                  padding: "10px 20px",
                  fontWeight: "bold",
                  fontSize: "1rem",
                  transition: "background-color 0.3s ease",
                  "&:hover": {
                    backgroundColor: "#02b0c4",
                  },
                }}
              >
                Passen Sie Ihr Produkt an
              </Button>
            </Grid>
          </Grid>
        </Container>
      ))}
    </>
  );
};

export default CatalogPage;
