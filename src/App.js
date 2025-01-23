import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import CatalogPage from "./pages/CatalogPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
      </Routes>
    </Router>
  );
};

export default App;
