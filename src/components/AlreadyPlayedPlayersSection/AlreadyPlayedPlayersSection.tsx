import { useEffect } from "react";
import { fetchAlreadyPlayedPlayers } from "../../services/crystalService";
import type { DiscordUser } from "../../services/discordService";

interface AlreadyPlayedPlayersSectionProps {
    allPlayers: DiscordUser[];
    setAlreadyPlayedPlayerIds: (players: string[]) => void;
    alreadyPlayedPlayerIds: string[];
}

export default function AlreadyPlayedPlayersSection({ allPlayers, setAlreadyPlayedPlayerIds, alreadyPlayedPlayerIds }: AlreadyPlayedPlayersSectionProps) {
    
    useEffect(() => {
        async function fetchPlayers() {
            const players = await fetchAlreadyPlayedPlayers();
            setAlreadyPlayedPlayerIds(players);
        }

        fetchPlayers();
    }, [allPlayers]);
    
    return(
        <div className=" flex flex-col gap-1 p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg border border-white/30 dark:border-gray-700/50 h-full">
            <div className="text-[8px] text-gray-500">{alreadyPlayedPlayerIds.length > 0 ? "PLAYERS THAT ALREADY PLAYED TODAY" : "NO PLAYERS HAVE PLAYED YET"}</div>
            <div className="flex items-center gap-1">
                {alreadyPlayedPlayerIds.map((playerId) => {
                    
                    const user = allPlayers.find(u => u.id === playerId);
                    return (
                        <div key={playerId}>
                            {user?.avatar ? (
                                <img
                                src={user?.avatar}
                                alt={`Avatar ${playerId}`}
                                className="w-7 h-7 rounded-full object-cover"
                                />
                            ) : (
                                <div className="w-7 h-7 rounded-full bg-gray-500" />
                            )}
                        </div>
                    )
                })}
            </div>
            
        </div>
    );
}