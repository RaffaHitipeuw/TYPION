import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import enter from "../assets/img/enterlogo.png";
import github from "../assets/img/github.png";
import discord from "../assets/img/discord.png";

const texts = [
"Speed is key to productivity in the digital age, and regular practice will sharpen your typing skills to an impressive professional level.",
  "Mastering ten-finger typing greatly helps work efficiency across various tasks, simultaneously reducing the physical strain and fatigue associated with long hours at the computer.",
  "Always remember that every second is a chance to get better, refine your technique, and push your limits, because perseverance is the main asset on the journey to mastery.",
  "Always focus on accuracy first to build a strong foundation, and only then should you increase your speed gradually over time, maintaining precision as your primary goal.",
  "For long-term health and optimal performance, don't forget to pay attention to your posture and ensure the correct position of your fingers on the home row keys.",
  "You must learn from your mistakes instead of getting frustrated; recognize that incorrect characters are valuable lessons that highlight areas needing more concentration.",
  "Treat the keyboard as your primary tool for creation and communication; endeavor to master every key with confidence and ease through muscle memory and focused repetition.",
  "To achieve consistency, practice a stable rhythm and cadence throughout the entire session; be sure to not rush, but also do not be too slow to maintain momentum.",
  "During the dry season, elephants often gather in the vast grasslands, near dwindling water sources, carefully seeking food and water to sustain their massive herds and calves.",
  "The sun rises in the east, painting the morning sky with hues of orange and pink, bringing hope and light to the whole world and signaling the start of a brand new day.",
  "Truly skilled programmers master various languages, understanding the logic behind different paradigms, which includes popular options such as Python and JavaScript for web and data tasks.",
  "Watch as the heavy clouds are moving slowly across the horizon, gathering moisture and density, clearly indicating that rain will soon fall and refresh the dry earth below.",
  "Computers, monitors, and printers are essential equipment in every modern office setting, forming the basic infrastructure necessary for complex data processing and document management.",
  "Beyond just typing, have you drunk enough water today to stay hydrated? It is crucial to keep taking care of your physical health to maintain high energy and mental focus.",
  "Ultimately, quality and speed must be balanced when producing any work; therefore, keep practicing without stopping until you can achieve both simultaneously and effortlessly.",
];

const HomePage = () => {
  const navigate = useNavigate();
  const [typedText, setTypedText] = useState("");
  const [cursorVisible, setCursorVisible] = useState(true);
  const [targetText, setTargetText] = useState("");
  const inputRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const random = texts[Math.floor(Math.random() * texts.length)];
    setTargetText(random);
  }, []);

  useEffect(() => {
    inputRef.current?.focus();
    const blink = setInterval(() => setCursorVisible((v) => !v), 500);
    return () => clearInterval(blink);
  }, []);

  useEffect(() => {
    if (textRef.current) {
      textRef.current.scrollTop = textRef.current.scrollHeight;
    }
  }, [typedText]);

  const handleKeyDown = (e) => {
    if (!targetText) return;

    if (e.key === "Backspace") {
      e.preventDefault();
      setTypedText((prev) => prev.slice(0, -1));
      return;
    }

    if (e.key.length === 1) {
      setTypedText((prev) => {
        const next = prev + e.key;
        return next;
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#2A2A2A] text-[#D5D5D5]">
      {/* HEADER */}
      <header className="grid grid-cols-3 items-center px-10 py-4 fixed top-0 left-0 w-full bg-[#2A2A2A] z-50">
        <div></div>

        <div className="flex justify-center items-center relative gap-2">
          <h1
            className="text-[40px] font-bold text-[#A6FF4D]"
            style={{ fontFamily: "'heavy', sans-serif" }}
          >
            TYPION
          </h1>
          <img
            src={enter}
            alt="enter logo"
            className="absolute left-[290px] -top-1 w-12"
          />
        </div>

        <div className="flex justify-end items-center gap-6">
          <a href="https://github.com/" target="_blank" rel="noreferrer">
            <img src={github} alt="GitHub" className="w-8 h-8" />
          </a>
          <a href="https://discord.com/" target="_blank" rel="noreferrer">
            <img src={discord} alt="Discord" className="w-8 h-8" />
          </a>
        </div>
      </header>

      {/* MAIN */}
      <main
        className="flex-1 mt-52 px-10 pb-32 flex justify-center overflow-y-auto"
        onClick={() => inputRef.current.focus()}
      >
        <input
          ref={inputRef}
          type="text"
          className="opacity-0 absolute"
          onKeyDown={handleKeyDown}
        />

        <div
          ref={textRef}
          className="relative max-w-[900px] text-[30px] leading-[1.6] font-mono whitespace-pre-wrap text-left"
        >
          {/* Render huruf per huruf dengan logika salah/benar */}
          {targetText.split("").map((char, i) => {
            let color = "#555"; // default abu-abu
            if (i < typedText.length) {
              color =
                typedText[i] === targetText[i]
                  ? "#A6FF4D" // benar
                  : "#FF4D4D"; // salah
            }
            return (
              <span key={i} style={{ color }}>
                {char}
              </span>
            );
          })}

          {/* Cursor absolute */}
          <span
            className={`absolute ${
              cursorVisible ? "bg-[#A6FF4D]" : "bg-transparent"
            } w-[3px] h-[1.1em] mt-1 transition-colors duration-200`}
            style={{
              left: `calc(${typedText.length}ch + 2px)`,
              top: 0,
            }}
          ></span>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
