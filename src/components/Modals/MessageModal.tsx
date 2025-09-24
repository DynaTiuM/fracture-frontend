import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { BaseModal } from "./BaseModal";

export function MessageModal() {
  const { socket } = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!socket) return;

    const handlePlayerMessage = (msg: string) => {
      setMessage(msg);
      setIsOpen(true);
    };

    socket.on("playerMessage", handlePlayerMessage);
    return () => {
        socket.off("playerMessage", handlePlayerMessage);
    }
  }, [socket]);

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={() => {
        setIsOpen(false);
        setMessage("");
      }}
      title="Info"
    >
      <div className="text-center">{message}</div>
    </BaseModal>
  );
}
