import { useEffect } from "react";
import { useSocket } from "../../hooks/useSocket";
import ActionButton from "./ActionButton";

interface Props {
  onCurrentAction: (action: "absorb" | "repair" | "hold") => void;
  action: "absorb" | "repair" | "hold" | null;
  setAction: (action: "absorb" | "repair" | "hold" | null) => void;
  hasActed: boolean;
  setHasActed: (hasActed: boolean) => void;
}

export default function CrystalActions({ action, onCurrentAction, hasActed, setHasActed, setAction }: Props) {

  const { socket } = useSocket();

  const handleActionAdded = (data: { action: "absorb" | "repair" | "hold" }) => {
    setHasActed(true);
    setAction(data.action);
  };

  useEffect(() => {
    if (!socket) return;

   
    socket.on("actionAdded", handleActionAdded);

    return (): void => {
      socket.off("actionAdded", handleActionAdded);
    };
  }, [socket]);

  
  return (
    <div className="flex flex-col items-center">
      {hasActed ? (
        <div className="text-xs text-green-600 dark:text-green-400 font-bold mb-2 uppercase">You chose the action: {action}</div>
      ) : (
        <div className="text-xs text-gray-600 dark:text-gray-400 font-bold mb-2 uppercase">Choose your action</div>
      )}
      <div className="flex gap-6 mt-2 mb-6 justify-center">
        <ActionButton 
          label="Absorb" 
          description="↗ Gain power" 
          gradient="bg-gradient-to-r from-purple-400 to-purple-600"
          currentAction="absorb"
          onCurrentAction={onCurrentAction}
          hasActed={hasActed}
        />
        <ActionButton 
          label="Repair" 
          description="↘ Lose power" 
          gradient="bg-gradient-to-r from-green-400 to-green-600"
          currentAction="repair"
          onCurrentAction={onCurrentAction}
          hasActed={hasActed}
        />
        <ActionButton 
          label="Hold" 
          description="⏸ Skip" 
          gradient="bg-gradient-to-r from-blue-400 to-blue-600"
          currentAction="hold"
          onCurrentAction={onCurrentAction}
          hasActed={hasActed}
        />
      </div>
    </div>
    
  );
}
