import { useEffect, useState } from "react";
import type { Leaderboard } from "../../models/Leaderboard";
import type { LeaderboardPlayer } from "../../models/LeaderboardPlayer";
import { fetchPlayerAvatar } from "../../services/playerService";
import { getLeaderboard } from "../../services/leaderboardService";
import type { DiscordUser } from "../../services/discordService";

interface LeaderboardProps {
  setAllPlayers: (player: DiscordUser[]) => void;
  allPlayers: DiscordUser[];
  hasActed: boolean;
}

export default function Leaderboard({ setAllPlayers, allPlayers, hasActed }: LeaderboardProps) {
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);
  
  async function fetchLeaderboard() {
    const data = await getLeaderboard();
    setLeaderboard(data);
  }

  useEffect(() => {
    fetchLeaderboard();
  }, [hasActed]);
  
  const session = leaderboard.slice().sort((a, b) => b.weeklyScore - a.weeklyScore);
  const allTime = leaderboard.slice().sort((a, b) => b.allTimeScore - a.allTimeScore);

  const medalColors = [
    "bg-gradient-to-r from-yellow-400 to-yellow-200 text-yellow-900 border-yellow-300",
    "bg-gradient-to-r from-gray-400 to-gray-200 text-gray-900 border-gray-300",
    "bg-gradient-to-r from-orange-400 to-orange-200 text-orange-900 border-orange-300"
  ];

  useEffect(() => {
    if(hasActed) {
    }
  });

   useEffect(() => {
    const fetchPlayers = async () => {
      const players: DiscordUser[] = [];
      for (const player of leaderboard) {
        try {
          const avatar = await fetchPlayerAvatar(player.discordId);
          players.push({
            id: player.discordId,
            username: player.username,
            avatar: avatar
          });
        } catch (err) {
          console.error("Failed to fetch avatar for", player.discordId, err);
        }
      }
      setAllPlayers(players);
    };

    fetchPlayers();
  }, [leaderboard]);


  const renderColumn = (title: string, players: LeaderboardPlayer[]) => (
    <div className="flex-1">
      <h2 className="text-2xl font-extrabold mb-6 text-center tracking-tight text-gray-800 dark:text-gray-100 uppercase letter-spacing-wide">
        {title}
      </h2>
      <div className="space-y-4">
        {players.map((player, index) => {
          const user = allPlayers.find(u => u.id === player.discordId);
          return (
        
            <div
              key={player.discordId}
              className={`flex items-center justify-between px-5 py-4 rounded-xl shadow-md transition-transform transform hover:scale-[1.025] border-2
                ${
                  index === 0 ? "bg-yellow-50 border-yellow-300" :
                  index === 1 ? "bg-gray-50 border-gray-300" :
                  index === 2 ? "bg-orange-50 border-orange-300" :
                  "bg-white border-gray-100 dark:bg-gray-800 dark:border-gray-700"
                }
              `}
            >
              <div className={`flex items-center gap-4 ${index < 3 ? 'text-gray-900' : ''}`}> 
                <span className={`w-10 h-10 flex items-center justify-center font-extrabold text-lg rounded-full border-2 shadow-sm
                  ${medalColors[index] ?? "bg-gray-200 text-gray-700 border-gray-300"}
                `}>
                  {index + 1}
                </span>
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-white font-bold text-xl shadow-inner">
                  {
                    user?.avatar ? (
                      <img
                        src={user?.avatar}
                        alt={player.username}
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-xl text-gray-700 dark:text-gray-300">
                        {player.username.charAt(0).toUpperCase()}
                      </span>
                    )
                  }
                  
                </div>
                <span className={`font-semibold text-lg ${index < 3 ? 'text-gray-900' : 'text-gray-800 dark:text-gray-100'}`}>
                  {player.username}
                </span>
                {player.badge && (
                  <span className="ml-2 px-3 py-1 text-xs font-bold text-white rounded-full bg-gradient-to-r from-blue-500 to-blue-400 shadow">
                    {player.badge.name}
                  </span>
                )}
                
              </div>
              <span className={`font-bold text-2xl text-right ${index < 3 ? 'text-gray-900' : 'text-gray-700 dark:text-gray-200'}`}>
                {title === "All Time" ? player.allTimeScore : player.weeklyScore}
              </span>
            </div>
          )
        }
        )}
      </div>
    </div>
  );

  return (
    <div className="w-full min-w-0 flex-none bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg border border-white/30 dark:border-gray-700/50 p-3 sm:p-4 lg:p-6 border">
  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mt-4 sm:mt-0 mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-purple-500 to-purple-600 dark:from-purple-400 dark:to-purple-300 bg-clip-text text-transparent drop-shadow-lg tracking-tight uppercase">
        Leaderboard
      </h1>
      <div className="flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-6 w-full flex-wrap min-w-0 mt-4 sm:mt-0">
        <div className="mb-4 md:mb-0 w-full md:flex-1">{renderColumn("Session", session)}</div>
        <div className="w-full md:flex-1 md:mb-0 mb-0">{renderColumn("All Time", allTime)}</div>
      </div>
    </div>
  );
}
