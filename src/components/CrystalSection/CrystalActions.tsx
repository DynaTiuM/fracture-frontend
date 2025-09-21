interface Props {
  onAction: (action: "absorb" | "fix" | "hold") => void;
}

export default function CrystalActions({ onAction }: Props) {
  return (
    <div className="flex gap-6 mt-6 justify-center">
      <button
        onClick={() => onAction("absorb")}
        className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-400 to-blue-600 text-white font-bold shadow hover:scale-105 transition-transform"
      >
        Absorber
      </button>
      <button
        onClick={() => onAction("fix")}
        className="px-6 py-2 rounded-full bg-gradient-to-r from-green-400 to-green-600 text-white font-bold shadow hover:scale-105 transition-transform"
      >
        Réparer
      </button>
      <button
        onClick={() => onAction("hold")}
        className="px-6 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-white font-bold shadow hover:scale-105 transition-transform"
      >
        Maintenir
      </button>
    </div>
  );
}
