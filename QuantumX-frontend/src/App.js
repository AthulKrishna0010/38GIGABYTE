// src/App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ExtractorPage from "./pages/ExtractorPage";
import Header from "./pages/Header"; // Import the Header component

function App() {
  return (
    <Router>
      <Header /> {/* Include the Header component here */}
      <Routes>
        <Route path="/" element={<ExtractorPage />} />
      </Routes>
    </Router>
  );
}

export default App;