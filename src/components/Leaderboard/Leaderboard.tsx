import type { Leaderboard } from "../../models/Leaderboard";
import type { LeaderboardPlayer } from "../../models/LeaderboardPlayer";

export default function Leaderboard({ leaderboard }: Leaderboard) {
  const session = leaderboard.slice().sort((a, b) => b.weeklyScore - a.weeklyScore);
  const allTime = leaderboard.slice().sort((a, b) => b.allTimeScore - a.allTimeScore);

  const medalColors = [
    "bg-gradient-to-r from-yellow-400 to-yellow-200 text-yellow-900 border-yellow-300",
    "bg-gradient-to-r from-gray-400 to-gray-200 text-gray-900 border-gray-300",
    "bg-gradient-to-r from-orange-400 to-orange-200 text-orange-900 border-orange-300"
  ];

  const renderColumn = (title: string, players: LeaderboardPlayer[]) => (
    <div className="flex-1">
      <h2 className="text-2xl font-extrabold mb-6 text-center tracking-tight text-gray-800 dark:text-gray-100 uppercase letter-spacing-wide">
        {title}
      </h2>
      <div className="space-y-4">
        {players.map((player, index) => (
          <div
            key={player.discordId}
            className={`flex items-center justify-between px-5 py-4 rounded-2xl shadow-md transition-transform transform hover:scale-[1.025] border-2
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
                {player.username.charAt(0).toUpperCase()}
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
        ))}
      </div>
    </div>
  );

  return (
    <div className="w-full min-w-0 flex-none bg-white/80 dark:bg-gray-900/80 rounded-2xl lg:rounded-3xl shadow-2xl p-3 sm:p-4 lg:p-6 border border-gray-200 dark:border-gray-800">
  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-center mt-4 sm:mt-0 mb-4 sm:mb-6 lg:mb-8 bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 bg-clip-text text-transparent drop-shadow-lg tracking-tight uppercase">
        Leaderboard
      </h1>
      <div className="flex flex-col md:flex-row gap-6 md:gap-4 lg:gap-6 w-full flex-wrap min-w-0 mt-4 sm:mt-0">
        <div className="mb-4 md:mb-0 w-full md:flex-1">{renderColumn("Session", session)}</div>
        <div className="w-full md:flex-1 md:mb-0 mb-0">{renderColumn("All Time", allTime)}</div>
      </div>
    </div>
  );
}
