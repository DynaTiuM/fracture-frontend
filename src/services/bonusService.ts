import type { Bonus } from "../models/Bonus";
import type { PlayerBonus } from "../models/PlayerBonus";
import api from "./api";

export async function getPlayerBonus(playerId: string): Promise<PlayerBonus[]> {
  const response = await api.get(`/bonus/player-bonus/${playerId}`);
  return response.data;
}

export async function getAllBonus(): Promise<Bonus[]> {
  const response = await api.get(`/bonus`);
  return response.data;
}
