import type { PlayerBonusResponse } from "../models/PlayerBonus";
import api from "./api";

export async function getPlayerBonus(playerId: string): Promise<PlayerBonusResponse> {
  const response = await api.get(`/bonus/player-bonuses/${playerId}`);
  return response.data;
}
