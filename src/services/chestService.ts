import api from "./api";
import type { Bonus } from "../models/Bonus";

export async function openChest(playerId: string): Promise<Bonus | null> {
  try {
    const { data } = await api.post(`/bonus/draw`, { playerId });
    return data.bonus as Bonus;
  } catch (err) {
    console.error("Failed to open chest", err);
    return null;
  }
}