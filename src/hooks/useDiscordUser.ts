import { useEffect, useState } from "react";
import { setupDiscord, type DiscordUser } from "../services/discordService";

export function useDiscordUser() {
  const [user, setUser] = useState<DiscordUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const u = await setupDiscord();
      setUser(u);
      setLoading(false);
    }
    fetchUser();
  }, []);

  return { user, loading };
}
