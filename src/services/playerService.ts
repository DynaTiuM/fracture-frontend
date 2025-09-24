import type { PlayerBonus } from "../models/PlayerBonus";
import api from "./api";
import type { DiscordUser } from "./discordService";


export async function createPlayer(player: DiscordUser) {
  const { data } = await api.post("/players", player);
  return data;
}

export async function fetchPlayerAvatar(playerId: string) {
  const { data } = await api.get(`/players/${playerId}/avatar`);
  return data.avatar;
};

export async function fetchHasPlayerDrawn(playerId: string) {
  const { data } = await api.get(`/players/${playerId}/has-drawn`);
  return data.hasDrawn;
};

export async function sendPlayerAction(playerId: string, action: string) {
  const { data } = await api.post(`/players/action`, { playerId, action });
  return data.hasDrawn;
};

export async function fetchHasPlayerPlayed(playerId: string) {
  const { data } = await api.get(`/players/${playerId}/has-played`);
  return data;
}

export async function fetchPlayerBonus(playerId: string): Promise<PlayerBonus[]> {
  const response = await api.get(`/players/${playerId}/bonus`);
  return response.data;
}

