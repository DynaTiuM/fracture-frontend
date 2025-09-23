import CrystalSection from "../CrystalSection/CrystalSection";
import ActionsSection from "../CrystalSection/CrystalActions";
import ProgressBarSection from "../ProgressBarSection/ProgressBarSection";
import Leaderboard from "../Leaderboard/Leaderboard";
import BonusSection from "../BonusSection/BonusSection";
import { ChestSection } from "../ChestSection.tsx/ChestSection";
import { useEffect, useState } from "react";
import type { DiscordUser } from "../../services/discordService";
import PlayerSection from "../PlayerSection/PlayerSection";
import { fetchHasPlayerPlayed, sendPlayerAction } from "../../services/playerService";
import AlreadyPlayedPlayersSection from "../AlreadyPlayedPlayersSection/AlreadyPlayedPlayersSection";

interface LayoutProps {
  user: DiscordUser | null;
}

export default function Layout({ user }: LayoutProps) {
  const [currentAction, setCurrentAction] = useState<"absorb" | "repair" | "hold" | null>(null);
  const [action, setAction] = useState<"absorb" | "repair" | "hold" | null>(null);
  const [avatars, setAvatars] = useState<Record<string, string>>({});
  const [hasDrawn, setHasDrawn] = useState<boolean>(true);
  const [hasActed, setHasActed] = useState<boolean>(false);


  useEffect(() => {
    if (currentAction) {
      // When action is modified, we call the backend to proceed the action
      if(user && user.id) {
        sendPlayerAction(user.id, currentAction);
        console.log("Player action sent to backend:", currentAction);
      }
      else {
        throw new Error("User ID is null when attempting to send player action");
      }
      const timer = setTimeout(() => {
        setCurrentAction(null);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentAction]);

  const getHasPlayerPlayed = async () => {
    if(user && user.id) {
      const player = await fetchHasPlayerPlayed(user.id);
      if(player.has_played == true) {
        setAction(player.action);
        setHasActed(true);
      }
    }
  }

  useEffect(() => {
      getHasPlayerPlayed();
  }, [user]);

  return (
    <div className="fixed inset-0 min-h-screen w-full bg-gradient-to-br from-purple-50 to-yellow-50 dark:from-gray-900 dark:to-gray-800 overflow-auto">
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col lg:flex-row gap-3 sm:gap-4 lg:gap-8 py-2 sm:py-4 lg:py-8 px-1 sm:px-2">
        <div className="flex flex-col gap-2 sm:gap-4 lg:gap-8 flex-[1_1_0%] min-w-0 w-full lg:w-auto">
          <div className="flex flex-col gap-2 sm:gap-4 w-full">
            <div className="flex gap-2 w-full max-w-full">
              <div className="flex-1 min-w-0">
                <PlayerSection user={user} />
              </div>
              <div className="flex-1 min-w-0 flex flex-col">
                <AlreadyPlayedPlayersSection avatars={avatars} />
              </div>
            </div>
            <CrystalSection action={currentAction} />
            <ActionsSection action={action} onCurrentAction={setCurrentAction} hasActed={hasActed} setHasActed={setHasActed} setAction={setAction} />
            <BonusSection user={user} setHasDrawn={setHasDrawn} />
            <ProgressBarSection />
          </div>
        </div>
        <div className="flex-[1.5_1.5_0%] min-w-0 flex flex-col items-stretch gap-2 sm:gap-4 lg:gap-8 w-full max-w-full lg:max-w-xl lg:w-auto">
          <div className="flex flex-col gap-2 sm:gap-4 lg:gap-8 w-full min-w-0">
            <div className="w-full max-w-full">
              <ChestSection user={user} hasDrawn = {hasDrawn} setHasDrawn={setHasDrawn} />
            </div>
            <div className="w-full max-w-full">
              <Leaderboard avatars = {avatars} setAvatars = {setAvatars} hasActed = {hasActed} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
