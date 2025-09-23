import type { DiscordUser } from "../../services/discordService";
import AlreadyPlayedPlayersSection from "../AlreadyPlayedPlayersSection/AlreadyPlayedPlayersSection";

interface PlayerSectionProps {
  user: DiscordUser | null;
}

export default function PlayerSection({ user }: PlayerSectionProps) {
  if (!user) return null;

  return (
    <div className="flex items-center gap-4 p-3 bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg border border-white/30 dark:border-gray-700/50">
        {user.avatar ? (
                <img
                    src={`https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.png?size=128`}
                    alt="Avatar"
                    className="w-12 h-12 rounded-full border-2 border-white/30 dark:border-gray-600 shadow-sm object-cover"
                />
            ) : (
                <div className="w-12 h-12 rounded-full bg-gray-400 flex items-center justify-center text-white font-bold">
                    {user.username.slice(0, 2).toUpperCase()}
                </div>
            )}

        <div className="flex flex-col">
            <span className="font-semibold text-gray-800 dark:text-gray-100 text-lg">
                {user.username}
            </span>
        </div>
    </div>
  );
}
