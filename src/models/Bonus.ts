export interface Bonus {
    id: string;
    name: string;
    probability: number;
    rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
    description: string;
    trigger: "IMMEDIATE" | "ON_PLAY" | "ON_OPEN";
}