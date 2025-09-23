import { useEffect, useState } from "react";
import { fetchSessionDay } from "../../services/crystalService";

export default function ProgressBarSection() {
  const [currentDay, setCurrentDay] = useState<number>(1);

  const loadCurrentDay = async () => {
    try {
      const day = await fetchSessionDay();
      setCurrentDay(day);
    } catch {
      console.error("Failed to fetch current day");
    }
  };

  useEffect(() => {
    loadCurrentDay();
  });

  return (
    <div className="flex flex-col items-center justify-center px-1 py-2 sm:px-2 sm:py-3 lg:p-6 bg-white/80 dark:bg-gray-900/80 rounded-xl lg:rounded-xl shadow-lg w-full">
      <span className="mb-2 sm:mb-3 text-base sm:text-lg font-semibold text-gray-700 dark:text-gray-200 text-center">Day {currentDay} / 7</span>
      <div className="flex flex-wrap gap-1 sm:gap-2 lg:gap-4 w-full justify-center">
        {[...Array(7)].map((_, i) => (
          <div
            key={i}
            className={`w-7 h-7 sm:w-8 sm:h-8 lg:w-10 lg:h-10 flex items-center justify-center rounded-full border-4 text-sm sm:text-base lg:text-lg font-bold shadow transition-all duration-300
              ${i < currentDay ? "bg-gradient-to-br from-yellow-400 to-yellow-600 border-yellow-400 text-white" : "bg-gray-200 border-gray-300 text-gray-400"}
            `}
          >
            {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
