import type { Bonus } from "../models/Bonus";
import api from "./api";


export async function getAllBonus(): Promise<Bonus[]> {
  const response = await api.get(`/bonus`);
  return response.data;
}

export async function usePlayerBonus(playerBonusId: string, playerId: string, targetIds: string[], useTomorrow = false )/* : Promise<PlayerBonusUsage[]> */ {
  const response = await api.post(`/bonus/use`, {
    playerBonusId,
    playerId,
    targetIds,
    useTomorrow,
  });
  return response.data;
}