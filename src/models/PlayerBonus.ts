export interface PlayerBonus {
  _id: string;
  playerId: string;
  bonusId: string;
  dateAcquired: string;
  __v?: number;
  name: string;
  description: string;
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
  targetMode: "none" | "single" | "multiple";
}

export interface PlayerBonusResponse {
  unused: PlayerBonus[];
  used: PlayerBonus[];
}
