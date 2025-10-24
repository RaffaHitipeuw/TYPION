import { useEffect } from "react";
import enterVector from "../assets/entervector.png";

export default function SplashScreen({ onEnter }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Enter") onEnter?.();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onEnter]);

  return (
    <div className="w-full h-screen bg-white flex flex-col items-center justify-center text-[#0D1117] relative overflow-hidden">
      <div className="relative flex items-center justify-center">
        <h1
          style={{ fontFamily: "Fontspring, sans-serif" }}
          className="text-[100px] font-bold leading-none tracking-wide text-[#0D1B2A]"
        >
          TYPION
        </h1>

        <img
          src={enterVector}
          alt="Enter Arrow"
          className="absolute ml-[390px] -mt-[60px] top-[1.05rem] w-[120px]"
        />
      </div>

      {/* Tagline */}
      <p
        style={{ fontFamily: "Helvetica, sans-serif" }}
        className="text-[#0D1B2A] text-[15px] mt-4"
      >
        press enter to begin
      </p>
    </div>
  );
}
