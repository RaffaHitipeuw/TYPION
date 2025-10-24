import { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import TypingBox from "./components/TypingBox";
import ReplayPage from "./components/ReplayPage";
import SplashScreen from "./components/SplashScreen";

function App() {
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onEnter={() => setShowSplash(false)} />;
  }

  return (
    <Router>
      <div className="min-h-screen bg-[#white] text-white font-mono flex flex-col items-center justify-center">
        <Routes>
          <Route path="/" element={<TypingBox />} />
          <Route path="/replay" element={<ReplayPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
