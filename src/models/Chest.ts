export type Item = {
  id: string;
  name: string;
  rarity: "Commun" | "Rare" | "Epique" | "Légendaire" | "Mythique";
  icon?: string;
};