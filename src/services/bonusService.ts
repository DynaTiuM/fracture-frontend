import type { PlayerBonusesResponse } from "../models/PlayerBonus";
import api from "./api";

export async function getPlayerBonuses(playerId: string): Promise<PlayerBonusesResponse> {
  const response = await api.get(`/bonus/player-bonuses/${playerId}`);
  return response.data;
}
