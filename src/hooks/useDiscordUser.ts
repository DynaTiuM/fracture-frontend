import { useEffect, useState } from "react";
import { setupDiscord, type DiscordUser } from "../services/discordService";
import { createPlayer } from "../services/playerService";

export function useDiscordUser() {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      try {
        const u = await setupDiscord();
        setUser(u);
        if (u) {
          await createPlayer(u);
        }
      } catch (err) {
        console.error("Unexpected error fetching Discord user", err);
      } finally {
        setLoading(false);
      }
    }
    fetchUser();
  }, []);

  return { user, loading };
}
