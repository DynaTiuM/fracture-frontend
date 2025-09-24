import { useState } from "react";
import type { DiscordUser } from "../../services/discordService";

interface TargetSelectionModalProps {
    user: DiscordUser | null;
    targetMode: "single" | "multiple";
    players?: DiscordUser[];
    alreadyPlayedPlayerIds: string[];
    onCancel: () => void;
    onSelect: (selectedIds: string[]) => void;
}

export function TargetSelectionModal({ user, targetMode, players, alreadyPlayedPlayerIds, onCancel, onSelect }: TargetSelectionModalProps) {
    const [selectedIds, setSelectedIds] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        if (targetMode === "single") {
            setSelectedIds([id]);
            } else {
            setSelectedIds((prev) =>
                prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
            );
            }
        };
        const selectablePlayers = players?.filter(p => alreadyPlayedPlayerIds.includes(p.id) && p.id !== user?.id) || [];


    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
        <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-[90vw] max-w-sm flex flex-col items-center">
            <div className="font-bold text-lg mb-2 text-center">
            Select Player{targetMode === "multiple" ? "s" : ""}
            </div>

            <div className="flex flex-col gap-2 mb-4 w-full max-h-64 overflow-y-auto">
            {selectablePlayers.map(player => (
                <button
                key={player.id}
                onClick={() => toggleSelect(player.id)}
                className={`px-4 py-2 rounded flex items-center gap-2 ${
                    selectedIds.includes(player.id)
                    ? "bg-green-600 text-white"
                    : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
                } font-semibold`}
                >
                <img
                    src={player.avatar || ""}
                    alt={player.username}
                    className="w-7 h-7 rounded-full object-cover"
                />
                <span>{player.username}</span>
                </button>
            ))}
            </div>

            <div className="flex gap-2 w-full justify-center">
            <button
                onClick={() => onSelect(selectedIds)}
                disabled={selectedIds.length === 0}
                className="px-4 py-2 rounded bg-green-600 text-white font-semibold hover:bg-green-700 disabled:opacity-50"
            >
                Confirm
            </button>
            <button
                onClick={onCancel}
                className="px-4 py-2 rounded bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 font-semibold hover:bg-gray-400 dark:hover:bg-gray-600"
            >
                Cancel
            </button>
            </div>
        </div>
        </div>
    );
}
