// Import necessary modules from React Router
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Import page and component files
import ExtractorPage from "./pages/ExtractorPage";
import Header from "./pages/Header"; // Import the Header component
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import Blog from "./pages/blog";
import Footer from "./pages/Footer";

// Main App component
function App() {
  return (
    // Wrap the entire application inside the Router to enable routing
    <Router>
      {/* The Header component will appear on all pages */}
      <Header />

      {/* Define routes for different paths in the application */}
      <Routes>
        {/* Home route - displays ExtractorPage */}
        <Route path="/" element={<ExtractorPage />} />
        
        {/* Pricing page route */}
        <Route path="/pricing" element={<Pricing />} />
        
        {/* About Us page route */}
        <Route path="/about" element={<AboutUs />} />
        
        {/* Blog page route */}
        <Route path="/blog" element={<Blog />} />
      </Routes>

      {/* The Footer component will appear on all pages */}
      <Footer />
    </Router>
  );
}

// Export the App component as default
export default App;
