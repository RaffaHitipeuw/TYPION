import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import enter from "../assets/img/enterlogo.png";

export default function SplashScreen() {
  const navigate = useNavigate();
  const [fadeOut, setFadeOut] = useState(false);

useEffect(() => {
  const fadeTimer = setTimeout(() => setFadeOut(true), 4000);
  const navTimer = setTimeout(() => navigate("/home"), 4600);

  return () => {
    clearTimeout(fadeTimer);
    clearTimeout(navTimer);
  };
}, [navigate]);


  return (
    <div
      className={`fixed inset-0 flex flex-col items-center justify-center
      bg-[#2A2A2A] z-9999 
      transition-opacity duration-700 ease-out
      ${fadeOut ? "opacity-0" : "opacity-100"}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-2 animate-logo">
        <h1
          className="text-[60px] font-bold text-[#A6FF4D]"
          style={{ fontFamily: "'heavy', sans-serif" }}
        >
          TYPION
        </h1>
        <img src={enter} alt="logo" className="w-14 absolute ml-52 -mt-9" />
      </div>

      {/* Loading Bar */}
      <div className="w-48 h-2 bg-[#3C3C3C] rounded-full mt-6 overflow-hidden">
        <div className="h-full bg-[#A6FF4D] animate-loading"></div>
      </div>

      <style>
        {`
          @keyframes logo {
            0% { opacity: 0; transform: translateY(20px); }
            100% { opacity: 1; transform: translateY(0); }
          }
          .animate-logo {
            animation: logo 0.9s ease-out forwards;
          }

          @keyframes loading {
            0% { width: 0%; }
            100% { width: 100%; }
          }
          .animate-loading {
            animation: loading 4s ease-out forwards;
          }
        `}
      </style>
    </div>
  );
}
