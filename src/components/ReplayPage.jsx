import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

export default function ReplayPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [graphData, setGraphData] = useState([]);
  const [displayText, setDisplayText] = useState("");
  const [playing, setPlaying] = useState(false);

  const typingLog = location.state?.typingLog || [];
  const progressData = location.state?.progressData || [];
  const sampleText = location.state?.sampleText || "";

  // animasi replay teks
  useEffect(() => {
    if (playing && typingLog.length > 0) {
      let i = 0;
      setDisplayText("");
      const interval = setInterval(() => {
        if (i < typingLog.length) {
          setDisplayText(typingLog[i].typed);
          setGraphData(progressData.slice(0, i));
          i++;
        } else {
          clearInterval(interval);
          setPlaying(false);
        }
      }, 50); // replay speed
      return () => clearInterval(interval);
    }
  }, [playing]);

  return (
    <div className="flex flex-col items-center justify-center text-center w-full max-w-3xl">

      {/* Live Replay Area */}
      <div className="bg-[#3a3d40] p-6 rounded-lg mb-8 w-full min-h-[150px] text-left text-2xl font-mono">
        {Array.from(sampleText).map((char, idx) => {
          const isTyped = idx < displayText.length;
          const correct = displayText[idx] === char;
          let style = "text-[#646669]";
          if (isTyped) style = correct ? "text-[#d1d0c5]" : "text-[#ca4754]";
          return (
            <span key={idx} className={`${style}`}>
              {char}
            </span>
          );
        })}
      </div>

      {/* Graph Sync */}
      <div className="w-full h-80 bg-[#3a3d40] rounded-xl p-4 shadow-md mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={graphData}>
            <XAxis dataKey="time" stroke="#E0E1DD" />
            <YAxis stroke="#E0E1DD" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#323437",
                border: "1px solid #E0E1DD",
                color: "white",
              }}
            />
            <Line
              type="monotone"
              dataKey="wpm"
              stroke="#E0E1DD"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={() => setPlaying(true)}
          disabled={playing}
          className={`px-5 py-2 rounded-lg transition-all ${
            playing
              ? "bg-[#44474a] text-[#999]"
              : "bg-[#3a3d40] text-[#e2b714] hover:bg-[#44474a]"
          }`}
        >
          {playing ? "Replaying..." : "▶ Mulai Replay"}
        </button>

        <button
          onClick={() => navigate("/")}
          className="px-5 py-2 bg-[#3a3d40] text-[#e2b714] rounded-lg hover:bg-[#44474a]"
        >
          ⬅ Kembali ke Tes
        </button>
      </div>
    </div>
  );
}
