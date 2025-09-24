import type { PlayerBonus } from "../../models/PlayerBonus";

interface BonusCardProps {
  bonus: PlayerBonus;
  color: string;
  onClick: (bonus: PlayerBonus) => void;
  hasPlayed?: boolean;
}

export function BonusCard({ bonus, color, onClick, hasPlayed }: BonusCardProps) {
  return (
    <button
        className={`px-4 py-2 rounded-lg font-bold text-white shadow ${!hasPlayed? "hover:scale-105 transition-transform cursor-pointer" : "opacity-30 cursor-not-allowed"} ${color}`}
        onClick={() => onClick(bonus)}
        disabled={hasPlayed}
    >
        {bonus.name}
    </button>
  );
}
