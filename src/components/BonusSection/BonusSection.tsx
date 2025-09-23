import { useEffect, useState } from "react";

import type { PlayerBonus } from "../../models/PlayerBonus";
import type { DiscordUser } from "../../services/discordService";
import { getPlayerBonus } from "../../services/bonusService";
import { useSocket } from "../../hooks/useSocket";

interface BonusSectionProps {
  user: DiscordUser | null;
  setHasDrawn: (hasDrawn: boolean) => void;
}

export default function BonusSection({ user, setHasDrawn }: BonusSectionProps) {
  const [bonus, setBonus] = useState<PlayerBonus[]>([]);
  const [modal, setModal] = useState<null | { bonus: PlayerBonus }>(null);

  const raritySections = [
    { rarity: "mythic", color: "bg-gradient-to-r from-pink-500 via-yellow-400 via-green-400 via-blue-500 to-purple-600" },
    { rarity: "legendary", color: "bg-gradient-to-r from-yellow-400 to-yellow-700" },
    { rarity: "epic", color: "bg-gradient-to-r from-purple-400 to-purple-700" },
    { rarity: "rare", color: "bg-gradient-to-r from-blue-400 to-blue-700" },
    { rarity: "common", color: "bg-gradient-to-r from-green-400 to-green-700" },
  ];

  const fetchBonus = async () => {
    if (!user) return;
    try {
      const data = await getPlayerBonus(user.id);
      setBonus(data || []);
    } catch {
      setBonus([]);
    }
  };

  const { socket } = useSocket(user?.id);

  const handleBonusDrawn = async () => {
    fetchBonus();
    setHasDrawn(true);
  }

  useEffect(() => {
    fetchBonus();
  }, [user]);

  useEffect(() => {
    if (!socket) return;

    socket.on("bonusDrawn", handleBonusDrawn);

    return () => {
      socket.off("bonusDrawn", handleBonusDrawn);
    };
  }, [socket]);

  if (!user) return null;

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl lg:rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 flex flex-col items-center">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold mb-4 text-green-700 dark:text-green-200 uppercase tracking-wide">
        Bonus
      </h2>

      <div className="flex flex-col w-full gap-6 py-4">
        {bonus.length === 0 ? (
          <span className="text-gray-500">No bonus</span>
        ) : (
          raritySections.map((section) => {
            const filtered = bonus.filter((b) => b.rarity === section.rarity);
            if (filtered.length === 0) return null;

            return (
              <div
                key={section.rarity}
                className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 flex flex-col gap-3 justify-center"
              >
                <p className="uppercase text-xs text-gray-500">{section.rarity}</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {filtered.map((b) => {
                    return (
                      <div key={b._id} className="relative flex flex-col items-center">
                        <button
                          className={`px-4 py-2 rounded-lg font-bold text-white shadow cursor-pointer hover:scale-105 transition-transform ${section.color}`}
                          onClick={() => setModal({ bonus: b })}
                        >
                          {b.name}
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })
        )}
      </div>

      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-[90vw] max-w-sm flex flex-col items-center">
            <div className="font-bold text-lg mb-2 text-center">{modal.bonus.name}</div>
            <div className="mb-4 text-center text-gray-600 dark:text-gray-300 text-sm">{modal.bonus.description}</div>
            <div className="flex gap-2 w-full justify-center">
              <button
                className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700"
                onClick={() => setModal(null)}
              >
                Use for today
              </button>
              <button
                className="px-4 py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600"
                onClick={() => setModal(null)}
              >
                Use for tomorrow
              </button>
            </div>
            <button
              className="mt-4 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-400 dark:hover:bg-gray-600"
              onClick={() => setModal(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
