import { useEffect, useState } from "react";
import { fetchAlreadyPlayedPlayers } from "../../services/crystalService";

interface AlreadyPlayedPlayersSectionProps {
    avatars?: Record<string, string>;
}

export default function AlreadyPlayedPlayersSection({ avatars }: AlreadyPlayedPlayersSectionProps) {
    const [alreadyPlayedPlayers, setAlreadyPlayedPlayers] = useState<string[]>([]);

    useEffect(() => {
        async function fetchPlayers() {
            const players = await fetchAlreadyPlayedPlayers();
            setAlreadyPlayedPlayers(players);
        }

        fetchPlayers();
    }, [avatars]);
    
    return(
        <div className=" flex flex-col gap-1 p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg border border-white/30 dark:border-gray-700/50 h-full">
            <div className="text-[8px] text-gray-500">{alreadyPlayedPlayers.length > 0 ? "PLAYERS THAT ALREADY PLAYED TODAY" : "NO PLAYERS HAVE PLAYED YET"}</div>
            <div className="flex items-center gap-1">
                {alreadyPlayedPlayers.map((id) => (
                    <div key={id}>
                    {avatars && avatars[id] ? (
                        <img
                        src={avatars[id]}
                        alt={`Avatar ${id}`}
                        className="w-7 h-7 rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-7 h-7 rounded-full bg-gray-500" />
                    )}
                    </div>
                ))}
            </div>
            
        </div>
    );
}