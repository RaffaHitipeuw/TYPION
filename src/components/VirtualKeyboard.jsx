const layout = [
  ["`", "1","2","3","4","5","6","7","8","9","0","-","="],
  ["q","w","e","r","t","y","u","i","o","p","[","]"],
  ["a","s","d","f","g","h","j","k","l",";","'"],
  ["z","x","c","v","b","n","m",",",".","/"]
];

export default function VirtualKeyboard({ activeKey }) {
  return (
    <div className="pt-[100px] space-y-2 text-center">
      {layout.map((row, i) => (
        <div key={i} className="flex justify-center gap-1">
          {row.map((key) => {
            const isActive = key.toLowerCase() === activeKey?.toLowerCase();
            return (
              <div
                key={key}
                className={`w-8 h-10 flex items-center justify-center rounded-md text-lg font-semibold transition-colors 
                ${isActive ? "bg-[#374151] text-[#E5E7EB]" : "bg-[#E5E7EB] text-[#374151]"}`}
              >
                {key}
              </div>
            );
          })}
        </div>
      ))}
    </div>  
  );
}