import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import TargetText from "./TargetText";
import StatsDisplay from "./StatsDisplay";
import VirtualKeyboard from "./VirtualKeyboard";


export default function TypingBox() {
  const [typed, setTyped] = useState("");
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState(null);
  const [elapsed, setElapsed] = useState(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [progressData, setProgressData] = useState([]);
  const [typingLog, setTypingLog] = useState([]);

  const inputRef = useRef(null);
  const navigate = useNavigate();

  const sampleText =
    "Mari kita mulai latihan mengetik hari ini. Kecepatan dan akurasi adalah kunci utama dalam dunia digital. Latihan yang konsisten akan selalu membuahkan hasil yang memuaskan";

  useEffect(() => {
    let timer;
    if (startTime && !finished) {
      timer = setInterval(() => {
        const newElapsed = (Date.now() - startTime) / 1000;
        setElapsed(Math.floor(newElapsed));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [startTime, finished]);

  const handleChange = (e) => {
    const val = e.target.value;
    setTyped(val);
    if (!startTime) setStartTime(Date.now());

    const correctChars = val
      .split("")
      .filter((c, i) => c === sampleText[i]).length;

    const acc = Math.round((correctChars / (val.length || 1)) * 100);
    setAccuracy(acc);

    const timeMinutes = elapsed / 60 || 1 / 60;
    const newWpm = Math.round((val.length / 5) / timeMinutes);
    setWpm(newWpm);

    // simpan progres & log
    const now = (Date.now() - startTime) / 1000;
    setProgressData((prev) => [...prev, { time: now.toFixed(2), wpm: newWpm }]);
    setTypingLog((prev) => [...prev, { time: now, char: val.slice(-1), typed: val }]);

    if (val.length >= sampleText.length) setFinished(true);
  };

  const handleFocus = () => inputRef.current?.focus();

  const handleReplay = () => {
    navigate("/replay", { state: { progressData, typingLog, sampleText } });
  };

  const handleRestart = () => {
    setTyped("");
    setFinished(false);
    setStartTime(null);
    setElapsed(0);
    setWpm(0);
    setAccuracy(100);
    setProgressData([]);
    setTypingLog([]);
  };

  return (
    <div
      className="flex flex-col items-center w-full select-none"
      onClick={handleFocus}
    >
      <input
        ref={inputRef}
        type="text"
        value={typed}
        onChange={handleChange}
        disabled={finished}
        className="opacity-0 absolute pointer-events-none"
      />

      {/* <StatsDisplay
        wpm={wpm}
        accuracyPercent={accuracy}
        elapsedSeconds={elapsed}
        correctChars={typed.length}
        sampleLength={sampleText.length}
      /> */}

      <TargetText sampleText={sampleText} typed={typed} finished={finished} />
      <VirtualKeyboard activeKey={typed.slice(-1)}/>

      {finished && (
        <div className="flex gap-4 mt-6">
          {/* <button
            onClick={handleRestart}
            className="px-5 py-2 bg-[#3a3d40] text-[#e2b714] rounded-lg hover:bg-[#44474a]"
          >
            Ulangi Tes
          </button>

          <button
            onClick={handleReplay}
            className="px-5 py-2 bg-[#3a3d40] text-[#e2b714] rounded-lg hover:bg-[#44474a]"
          >
            Lihat Replay
          </button> */}
        </div>
      )}
    </div>
  );
}
