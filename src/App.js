import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import CatalogPage from "./pages/CatalogPage";
import EditorPage from "./pages/EditorPage"; // Yeni sayfayı ekliyoruz

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/editor" element={<EditorPage />} /> {/* Yeni rota */}
      </Routes>
    </Router>
  );
};

export default App;
