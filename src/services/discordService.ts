import { DiscordSDK } from "@discord/embedded-app-sdk";

export interface DiscordUser {
  id: string;
  username: string;
  discriminator?: string;
  avatar: string | null;
}

let discordSdk: DiscordSDK | null = null;

export async function setupDiscord(): Promise<DiscordUser | null> {
  try {
    if (!discordSdk) {
      discordSdk = new DiscordSDK("1418639055650029828");
    }

    await discordSdk.ready();

    const { code } = await discordSdk.commands.authorize({
      client_id: "1418639055650029828",
      response_type: "code",
      prompt: "none",
      scope: ["identify", "applications.commands"],
    });

    let access_token: string | null = null;

    if (code) {
      const tokenResp = await fetch("/api/token", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await tokenResp.json();
      access_token = data.access_token;
      if (!access_token) throw new Error("No access token returned");

      await discordSdk.commands.authenticate({ access_token });
    } else {
      console.warn("User already authenticated, waiting...");
    }

    if (access_token) {
      const user = await fetch("https://discord.com/api/users/@me", {
        headers: { Authorization: `Bearer ${access_token}` },
      }).then((r) => r.json());
      return user as DiscordUser;
    }

    return null;

  } catch (err: any) {
    if (err?.code === 4002) {
      console.warn("User already authenticated, continuing...");
      return null;
    } else {
      console.error("Failed to authenticate Discord", err);
      throw err;
    }
  }
}
