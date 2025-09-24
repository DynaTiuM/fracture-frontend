import { useEffect, useState } from "react";
import { useSocket } from "../../hooks/useSocket";
import { BaseModal } from "./BaseModal";

interface BonusMessage {
  message: string
}

export function BonusMessageModal() {
  const { socket } = useSocket();
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!socket) return;

    const handlePlayerMessage = (bonusMessage: BonusMessage) => {
      setMessage(bonusMessage.message);
      setIsOpen(true);
    };

    socket.on("bonusPlayerMessage", handlePlayerMessage);
    return () => {
        socket.off("bonusPlayerMessage", handlePlayerMessage);
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
