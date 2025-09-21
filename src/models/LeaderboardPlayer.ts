export interface LeaderboardPlayer {
  discordId: string;
  username: string;
  weeklyScore: number;
  allTimeScore: number;
  badge?: { name: string; type: string };
} 