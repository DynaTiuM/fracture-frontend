import type { LeaderboardPlayer } from "../models/LeaderboardPlayer";
import api from "./api";

export async function getLeaderboard(): Promise<LeaderboardPlayer[]> {
  try {
    const { data } = await api.get("/leaderboard");
    console.log(data);
    return data.leaderboard;
  } catch (err) {
    console.error("Failed to fetch leaderboard", err);
    return [];
  }
}
