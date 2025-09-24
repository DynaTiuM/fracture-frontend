import type { PlayerBonus } from "../../models/PlayerBonus";

interface BonusModalProps {
  bonus: PlayerBonus;
  onClose: () => void;
  onUse: (useTomorrow: boolean) => void;
}

export function BonusModal({ bonus, onClose, onUse }: BonusModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-[90vw] max-w-sm flex flex-col items-center">
        <div className="font-bold text-lg mb-2 text-center">{bonus.name}</div>
        <div className="mb-4 text-center text-gray-600 dark:text-gray-300 text-sm">{bonus.description}</div>
        <div className="flex gap-2 w-full justify-center">
          <button
            className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
            onClick={() => onUse(false)}
          >
            Use for today
          </button>
          <button
            className="px-4 py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600"
            onClick={() => onUse(true)}
          >
            Use for tomorrow
          </button>
        </div>
        <button
          className="mt-4 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-400 dark:hover:bg-gray-600"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
