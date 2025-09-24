import { useEffect, useState } from "react";
import type { DiscordUser } from "../../services/discordService";
import { useSocket } from "../../hooks/useSocket";
import { BaseModal } from "./BaseModal";

interface PlayerAction {
  playerId: string;
  date: string;
  action: string;
  score: number;
}

interface RevealActionsModalProps {
  allPlayers: DiscordUser[];
}

export function RevealActionsModal({ allPlayers }: RevealActionsModalProps) {
  const { socket } = useSocket();
  const [actions, setActions] = useState<PlayerAction[]>([]);
  const [bonusMessage, setBonusMessage] = useState<string>("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const handleReveal = (data: PlayerAction) => {
      setActions(prev => {
        const others = prev.filter(a => a.playerId !== data.playerId);
        return [...others, data];
      });
      setIsOpen(true);
    };
    const handleBonusMessage = (data: { playerId: string; message: string }) => {
      setBonusMessage(data.message);
      setIsOpen(true);
    };

    socket.on("revealAction", handleReveal);
    socket.on("additionalBonusPlayerMessage", handleBonusMessage);
    return () => {
      socket.off("revealAction", handleReveal);
    socket.on("additionalBonusPlayerMessage", handleBonusMessage);
    }
  }, [socket]);

  const handleClose = () => {
    setIsOpen(false);
    setActions([]);
    setBonusMessage("");
  };

  if (!isOpen) return null;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={handleClose}
      title="Player Actions"
    >
       {bonusMessage && (
        <div className="mb-4 px-3 py-2 rounded bg-yellow-100 dark:bg-yellow-700 text-xs text-center font-semibold text-gray-800 dark:text-gray-200">
          {bonusMessage}
        </div>
      )}
      {allPlayers.map(player => {
        const playerAction = actions.find(a => a.playerId === player.id);
        return playerAction ? (
          <div
            key={player.id}
            className="flex justify-between px-3 py-2 rounded bg-gray-200 dark:bg-gray-700"
          >
            <div className="flex items-center gap-2">
              <img
                src={player.avatar || ""}
                alt={player.username}
                className="w-7 h-7 rounded-full object-cover"
              />
              <span className="font-semibold">{player.username}</span>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-300 capitalize">
              {playerAction.action} ({playerAction.score} points earned)
            </span>
          </div>
        ) : undefined;
      })}
    </BaseModal>
  );
}
