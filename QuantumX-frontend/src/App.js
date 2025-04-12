// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExtractorPage from "./pages/ExtractorPage";
import Header from "./pages/Header"; // Import the Header component
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/blog";
import Footer from "./pages/Footer";

function App() {
  return (
    <Router>
      <Header /> {/* Include the Header component here */}
      <Routes>
        <Route path="/" element={<ExtractorPage />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/blog" element={<Blog />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;