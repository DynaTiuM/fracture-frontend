import { useEffect, useState } from "react";
import { getPlayerBonus } from "../../services/bonusService";
import type { PlayerBonus } from "../../models/PlayerBonus";
import { useDiscordUser } from "../../hooks/useDiscordUser";

export default function BonusSection() {

  const { user, loading: userLoading } = useDiscordUser();
  const [bonus, setBonus] = useState<PlayerBonus[]>([]);
  const [loading, setLoading] = useState(true);
  const [openBonusId, setOpenBonusId] = useState<string | null>(null);
  const [modal, setModal] = useState<null | { bonus: PlayerBonus }>(null);

  useEffect(() => {
    if (!user || !user.id) return;
    setLoading(true);
    getPlayerBonus(user.id)
      .then((data) => {
        setBonus(data.unused);
        console.log(data.unused);
      })
      .catch(() => setBonus([]))
      .finally(() => setLoading(false));
  }, [user]);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl lg:rounded-2xl shadow-lg p-3 sm:p-4 lg:p-6 flex flex-col items-center">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-extrabold mb-2 sm:mb-3 lg:mb-4 text-green-700 dark:text-green-200 uppercase tracking-wide">Bonus</h2>
      <div className="flex flex-col w-full gap-6 py-4">
        {userLoading || loading ? (
          <span className="text-gray-400">Loading...</span>
        ) : !Array.isArray(bonus) || bonus.length === 0 ? (
          <span className="text-gray-500">No bonus</span>
        ) : (
          <>
            {[
              { rarity: "mythic", color: "from-pink-500 via-yellow-400 via-green-400 via-blue-500 to-purple-600 bg-gradient-to-r" },
              { rarity: "legendary", color: "from-yellow-400 to-yellow-700" },
              { rarity: "epic", color: "from-purple-400 to-purple-700" },
              { rarity: "rare", color: "from-blue-300 to-blue-600" },
              { rarity: "common", color: "from-green-200 to-green-500" },
            ].map((section) => {
              const filtered = bonus.filter((b) => b.rarity === section.rarity);
              if (filtered.length === 0) return null;
              return (
                <div key={section.rarity} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 flex flex-wrap gap-3 sm:gap-4 lg:gap-5 justify-center">
                  {filtered.map((bonus) => {
                    let color = section.color;
                    const isMythic = bonus.rarity === "mythic";
                    const isOpen = openBonusId === bonus._id;
                    return (
                      <div key={bonus._id} className="relative flex flex-col items-center">
                        <button
                          type="button"
                          aria-expanded={isOpen}
                          aria-controls={`bonus-desc-${bonus._id}`}
                          className={
                            isMythic
                              ? "px-4 py-2 rounded-full font-bold shadow cursor-pointer transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 border-2 border-white text-white mythic-rainbow"
                              : `px-4 py-2 rounded-full ${color} bg-gradient-to-r text-white font-bold shadow cursor-pointer transition-transform duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-${color.split(' ')[0].replace('from-', '')}`
                          }
                          onClick={() => setOpenBonusId(isOpen ? null : bonus._id)}
                        >
                          {bonus.name}
                        </button>
                        {isOpen && (
                          <div
                            id={`bonus-desc-${bonus._id}`}
                            className="absolute left-1/2 -translate-x-1/2 mt-2 z-30 flex flex-col items-center"
                          >
                            <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-gray-100 rounded-lg shadow-lg px-4 py-2 text-sm w-64 max-w-xs border border-gray-200 dark:border-gray-700 animate-fadeIn flex flex-col items-center">
                              <div className="font-bold mb-1">{bonus.name}</div>
                              <div className="mb-2 text-center">{bonus.description}</div>
                              <div className="mt-1 text-xs italic text-gray-500 mb-2">Rarity: {bonus.rarity}</div>
                              <button
                                className="mt-1 px-3 py-1 rounded bg-blue-600 text-white font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
                                onClick={() => { setModal({ bonus }); setOpenBonusId(null); }}
                              >
                                Use
                              </button>
                              <button
                                className="mt-2 px-2 py-1 rounded text-xs bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600"
                                onClick={() => setOpenBonusId(null)}
                              >
                                Close
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </>
        )}
      {modal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-[90vw] max-w-sm flex flex-col items-center">
            <div className="font-bold text-lg mb-2 text-center">Use bonus?</div>
            <div className="mb-2 text-center">{modal.bonus.name}</div>
            <div className="mb-4 text-center text-gray-600 dark:text-gray-300 text-sm">{modal.bonus.description}</div>
            <div className="flex gap-2 w-full justify-center">
              <button
                className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                onClick={() => { setModal(null); }}
              >
                Use for today
              </button>
              <button
                className="px-4 py-2 rounded bg-yellow-500 text-white font-semibold hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                onClick={() => { setModal(null); }}
              >
                Use for tomorrow
              </button>
            </div>
            <button
              className="mt-4 px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-400 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
              onClick={() => setModal(null)}
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}
