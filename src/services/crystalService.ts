import api from "./api";
import type { Crystal } from "../models/Crystal";

export const crystalService = {
  async getCrystal(): Promise<Crystal> {
    const res = await api.get("/crystal");
    return res.data;
  },

  async getHistory() {
    const res = await api.get("/crystal/history");
    return res.data;
  },
};
