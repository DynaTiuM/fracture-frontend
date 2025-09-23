import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

let socket: Socket | null = null;

export function useSocket(userId?: string) {
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    if (!socket) {
      socket = io("/");
      socket.on("connect", () => setConnected(true));
    }

    socket.emit("joinPlayerRoom", { playerId: userId });

    return () => {
    };
  }, [userId]);

  return { socket, connected };
}
