import { type ReactNode } from "react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
}

export function BaseModal({ isOpen, onClose, title, children }: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl p-6 w-[90vw] max-w-md flex flex-col gap-4">
        {title && <h2 className="text-lg font-bold mb-2 text-center">{title}</h2>}
        <div className="flex flex-col gap-2 max-h-64 overflow-y-auto">
          {children}
        </div>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Close
        </button>
      </div>
    </div>
  );
}
