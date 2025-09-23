import api from "./api";

export async function fetchCrystalStatus(): Promise<string> {
  const res = await api.get("/crystal/status");
  return res.data;
}

export async function fetchCrystalHistory() {
  const res = await api.get("/crystal/history");
  return res.data;
}

export async function fetchSessionDay(): Promise<number> {
  const res = await api.get("/crystal/session-day");
  return res.data.sessionDay;
}

export async function fetchAlreadyPlayedPlayers() {
  const { data } = await api.get(`/crystal/already-played-players`);
  return data.alreadyPlayedPlayers;
};