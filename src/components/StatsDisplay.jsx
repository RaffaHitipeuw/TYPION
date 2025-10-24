export default function StatsDisplay({
  wpm,
  accuracyPercent,
  elapsedSeconds,
  correctChars,
  sampleLength,
}) {
  return (
    <div className="flex justify-center gap-10 mb-8 text-center select-none">
      <div>
        <div className="text-4xl font-semibold text-white">{wpm}</div>
        <div className="text-sm text-[#646669]">WPM</div>
      </div>
      <div>
        <div className="text-4xl font-semibold text-white">{elapsedSeconds}</div>
        <div className="text-sm text-[#646669]">Detik</div>
      </div>
      <div>
        <div className="text-4xl font-semibold text-white">
          {accuracyPercent}%
        </div>
        <div className="text-sm text-[#646669]">Akurasi</div>
      </div>
      <div>
        <div className="text-4xl font-semibold text-white">
          {correctChars}/{sampleLength}
        </div>
        <div className="text-sm text-[#646669]">Karakter</div>
      </div>
    </div>
  );
}
