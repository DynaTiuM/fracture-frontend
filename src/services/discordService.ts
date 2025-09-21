import { DiscordSDK } from "@discord/embedded-app-sdk";

export interface DiscordUser {
  id: string;
  username: string;
  discriminator: string;
  avatar: string | null;
}

let discordSdk: DiscordSDK | null = null;

export async function setupDiscord(): Promise<DiscordUser | null> {
  try {
    if (!discordSdk) {
      discordSdk = new DiscordSDK(import.meta.env.VITE_DISCORD_CLIENT_ID);
    }
    
    await discordSdk.ready();

    const auth = await discordSdk.commands.authenticate({});

    if (!auth.access_token) {
      console.error("Discord authentication failed: no access_token");
      return null;
    }

    const user = await fetch("https://discord.com/api/users/@me", {
      headers: {
        Authorization: `Bearer ${auth.access_token}`,
      },
    }).then((res) => res.json());

    return user as DiscordUser;
  } catch (err) {
    console.error("Failed to setup Discord", err);
    return null;
  }
}
