import api from "./api";
import type { CrystalAction } from "../models/Crystal";

export const playerService = {
  async addAction(playerId: string, action: CrystalAction) {
    return api.post("/action", { playerId, action });
  },

  async getBonuses(playerId: string): Promise<string[]> {
    const res = await api.get(`/players/${playerId}/bonuses`);
    return res.data;
  },
};
