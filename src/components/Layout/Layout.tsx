import CrystalSection from "../CrystalSection/CrystalSection";
import ActionsSection from "../CrystalSection/CrystalActions";
import ProgressBarSection from "../ProgressBarSection/ProgressBarSection";
import Leaderboard from "../Leaderboard/Leaderboard";
import BonusesSection from "../BonusesSection/BonusesSection";
import { ChestSection } from "../ChestSection.tsx/ChestSection";
import type { LeaderboardPlayer } from "../../models/LeaderboardPlayer";
import { getLeaderboard } from "../../services/leaderboardService";
import { useEffect, useState } from "react";

export default function Layout() {
  const [leaderboard, setLeaderboard] = useState<LeaderboardPlayer[]>([]);

  useEffect(() => {
    async function fetchLeaderboard() {
      const data = await getLeaderboard();
      setLeaderboard(data);
    }
    fetchLeaderboard();
  }, []);

  return (
    <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-br from-purple-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 overflow-auto">
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-8 py-2 sm:py-4 lg:py-8 px-1 sm:px-2">
  <div className="flex flex-col gap-2 sm:gap-4 lg:gap-8 flex-[1_1_0%] min-w-0 w-full lg:w-auto">
          <div className="flex flex-col gap-2 sm:gap-4 w-full">
            <CrystalSection />
            <ActionsSection onAction={(a) => console.log('Action:', a)} />
            <BonusesSection />
            <ProgressBarSection />
          </div>
        </div>
        <div className="flex-[1.5_1.5_0%] min-w-0 flex flex-col items-stretch gap-2 sm:gap-4 lg:gap-8 w-full max-w-full lg:max-w-xl lg:w-auto">
          <div className="flex flex-col gap-2 sm:gap-4 lg:gap-8 w-full min-w-0">
            <div className="w-full max-w-full">
              <ChestSection />
            </div>
            <div className="w-full max-w-full">
              <Leaderboard leaderboard={leaderboard} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
