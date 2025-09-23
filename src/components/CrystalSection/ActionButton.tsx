interface ActionButtonProps {
  label: string;
  description: string;
  gradient: string;
  currentAction: "absorb" | "repair" | "hold";
  onCurrentAction: (a: "absorb" | "repair" | "hold") => void;
  hasActed: boolean;
}

export default function ActionButton({ label, description, gradient, currentAction, onCurrentAction, hasActed }: ActionButtonProps) {
  return (
    <div>
      <button
        onClick={() => onCurrentAction(currentAction)}
        disabled={hasActed}
        className={`px-5 py-1 rounded-lg font-bold shadow transition-transform
          ${hasActed
            ? "bg-gray-400 cursor-not-allowed text-gray-200"
            : gradient + " text-white hover:scale-105"}
        `}
      >
        {label}
      </button>
      <p className="text-gray-500 text-xs pt-1">({description})</p>
    </div>
  );
}
