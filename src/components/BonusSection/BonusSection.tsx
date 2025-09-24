import { useEffect, useState } from "react";
import type { PlayerBonus } from "../../models/PlayerBonus";
import type { DiscordUser } from "../../services/discordService";
import { fetchPlayerBonus } from "../../services/playerService";
import { useSocket } from "../../hooks/useSocket";

import { BonusCard } from "./BonusCard";
import { BonusModal } from "./BonusModal";
import { TargetSelectionModal } from "./TargetSelectionModal";
import { usePlayerBonus } from "../../services/bonusService";

interface BonusSectionProps {
  user: DiscordUser | null;
  setHasDrawn: (hasDrawn: boolean) => void;
  allPlayers: DiscordUser[];
  alreadyPlayedPlayerIds: string[];
}

export default function BonusSection({ user, setHasDrawn, allPlayers, alreadyPlayedPlayerIds }: BonusSectionProps) {
  const [bonus, setBonus] = useState<PlayerBonus[]>([]);
  const [modal, setModal] = useState<null | { bonus: PlayerBonus }>(null);
  const [targetModal, setTargetModal] = useState<null | { bonus: PlayerBonus }> (null);
  
  const hasPlayed = user ? alreadyPlayedPlayerIds.includes(user.id) : false;

  const raritySections = [
    { rarity: "mythic", color: "bg-gradient-to-r from-pink-500 via-yellow-400 via-green-400 via-blue-500 to-purple-600" },
    { rarity: "legendary", color: "bg-gradient-to-r from-yellow-400 to-yellow-700" },
    { rarity: "epic", color: "bg-gradient-to-r from-purple-400 to-purple-700" },
    { rarity: "rare", color: "bg-gradient-to-r from-blue-400 to-blue-700" },
    { rarity: "common", color: "bg-gradient-to-r from-green-400 to-green-700" },
  ];

  const { socket } = useSocket(user?.id);

  const fetchBonus = async () => {
    if (!user) return;
    try {
      const data = await fetchPlayerBonus(user.id);
      setBonus(data || []);
    } catch {
      setBonus([]);
    }
  };

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

  const handleUseBonus = async (bonus: PlayerBonus, useTomorrow: boolean, targetIds?: string[]) => {
    if (bonus.targetMode && bonus.targetMode !== "none" && !targetIds) {
      setTargetModal({ bonus });
      setModal(null);
      return;
    }

    try {
      if(!targetIds && (bonus.targetMode == "multiple" || bonus.targetMode == "single")) {
        throw new Error("The targetIds are not defined!");
      }
      await usePlayerBonus(bonus._id, user!.id, targetIds!, useTomorrow);
      setModal(null);
      setTargetModal(null);
      fetchBonus();
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Error using bonus");
    }
  };

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
              <div key={section.rarity} className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800 flex flex-col gap-3 justify-center">
                <p className="uppercase text-xs text-gray-500">{section.rarity}</p>
                <div className="flex flex-wrap gap-3 justify-center">
                  {filtered.map((b) => (
                    <BonusCard key={b._id} bonus={b} color={section.color} onClick={() => setModal({ bonus: b })} hasPlayed={hasPlayed} />
                  ))}
                </div>
              </div>
            );
          })
        )}
      </div>

      {modal && (
        <BonusModal
          bonus={modal.bonus}
          onClose={() => setModal(null)}
          onUse={(useTomorrow) => handleUseBonus(modal.bonus, useTomorrow)}
        />
      )}

      {targetModal && (
        <TargetSelectionModal
          user={user}
          targetMode={targetModal.bonus.targetMode as "single" | "multiple"}
          players={allPlayers}
          alreadyPlayedPlayerIds={alreadyPlayedPlayerIds}
          onCancel={() => setTargetModal(null)}
          onSelect={(selectedIds) => handleUseBonus(targetModal.bonus, false, selectedIds)}
        />
      )}
    </div>
  );
}
