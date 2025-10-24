export default function TargetText({ sampleText, typed, finished }) {
  return (
    <div className="text-2xl leading-relaxed text-center max-w-3xl mb-8 cursor-text">
      {Array.from(sampleText).map((char, index) => {
        let style = "text-[#646669] text-[27px]"; // default: abu gelap
        if (index < typed.length) {
          style =
            typed[index] === char
              ? "text-[#d1d0c5] text-[27px]" // benar
              : "text-[#ca4754] border-b-2 border-[#ca4754] text-[27px]"; // salah
        } else if (index === typed.length && !finished) {
          style = "bg-[#D9D9D9] text-[#0D1B2A] text-[27px] animate-pulse";
        }

        return (
          <span key={index} className={`${style} px-px`}>
            {char}
          </span>
        );
      })}
    </div>
  );
}
