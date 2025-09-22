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
      discordSdk = new DiscordSDK("1418639055650029828");
    }

    await discordSdk.ready();

    const { code } = await discordSdk.commands.authorize({
      client_id: "1418639055650029828",
      response_type: "code",
      prompt: "none",
      scope: ["identify", "applications.commands"],
    });

    console.log("code:", code);

    if (!code) throw new Error("No authorization code");

    const tokenResp = await fetch("https://03db6b18ef7c.ngrok-free.app/api/token", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code }),
    });
    const { access_token } = await tokenResp.json();
    if (!access_token) throw new Error("No access token returned");

    await discordSdk.commands.authenticate({ access_token });

    const user = await fetch("https://discord.com/api/users/@me", {
      headers: { Authorization: `Bearer ${access_token}` },
    }).then((r) => r.json());

    return user as DiscordUser;
  } catch (err) {
    console.error("Failed to setup Discord", err);
    return null;
  }
}
