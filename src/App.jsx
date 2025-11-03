import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Components
import SplashScreen from "./components/SplashScreen";
import HomePage from "./components/HomePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SplashScreen />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
  );
}
