import { io } from "socket.io-client";

const socket = io("http://localhost:3000");

socket.on("connect", () => {
  console.log("Connected as mock client:", socket.id);

  socket.emit("startActivity", { playerId: "333" });

  socket.on("bonusNotification", (data) => {
    console.log("Bonus applied event received:", data);
  });

  socket.on("crystalUpdated", (data) => {
    console.log("Crystal updated:", data);
  });

  socket.on("PlayerProtected", (data) => {
    console.log("Player protected:", data);
  });
});
