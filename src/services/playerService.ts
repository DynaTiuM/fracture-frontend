import api from "./api";
import type { CrystalAction } from "../models/Crystal";

export const playerService = {
  async addAction(playerId: string, action: CrystalAction) {
    return api.post("/action", { playerId, action });
  },
};
