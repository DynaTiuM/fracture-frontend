import { useState } from "react";
import { motion } from "framer-motion";
import chestClosed from "../../assets/chest_closed.png";
import chestOpened from "../../assets/chest_opened.png";

export function ChestSection() {
  const [opened, setOpened] = useState(false);
  return (
  <div className="flex flex-col items-center bg-white/80 dark:bg-gray-900/80 rounded-2xl lg:rounded-3xl shadow-2xl p-3 sm:p-4 lg:p-6 border border-gray-200 dark:border-gray-800 w-full min-w-0 flex-none">
      <motion.img
        src={opened ? chestOpened : chestClosed}
        alt="Chest"
        className="w-16 h-16 sm:w-20 sm:h-20 cursor-pointer select-none"
        initial={false}
        animate={{ scale: opened ? 1.12 : 1, rotate: opened ? 10 : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
        onClick={() => setOpened((o) => !o)}
      />
    </div>
  );
}
