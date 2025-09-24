import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { openChest } from "../../services/chestService";
import type { DiscordUser } from "../../services/discordService";
import { getAllBonus } from "../../services/bonusService";
import type { Bonus } from "../../models/Bonus";
import chestOpenedImg from '../../assets/chest_opened.png';
import chestClosedImg from '../../assets/chest_closed.png';
import { fetchHasPlayerDrawn } from "../../services/playerService";

interface ChestSectionProps {
  user: DiscordUser | null;
  hasDrawn: boolean;
  setHasDrawn: (hasDrawn: boolean) => void;
}

type AnimationState = 'idle' | 'spinning' | 'finished';

export function ChestSection({ user, hasDrawn, setHasDrawn }: ChestSectionProps) {
  const [allBonus, setAllBonus] = useState<Bonus[]>([]);
  const [drawnBonus, setDrawnBonus] = useState<Bonus | null>(null);
  const [animationState, setAnimationState] = useState<AnimationState>('idle');
  const [roulettePosition, setRoulettePosition] = useState(0);
  const [winningIndex, setWinningIndex] = useState<number>(-1);

  const itemHeight = 60;
  const containerHeight = 300;
  const visibleItems = Math.floor(containerHeight / itemHeight);
  const centerPosition = Math.floor(visibleItems / 2);
  const totalSpins = 5;

  const fetchBonuses = async () => {
    try {
      const bonus = await getAllBonus();
      setAllBonus(bonus || []);
    } catch (err) {
      console.error("Failed to fetch bonus", err);
    }
  };

  const checkDrawn = async () => {
    const hasDrawn = await fetchHasPlayerDrawn(user?.id || "");
    if (hasDrawn) {
      setHasDrawn(true);
    }
    else {
      setHasDrawn(false);
      fetchBonuses();
    }
  }

  useEffect(() => {
    checkDrawn();
  }, []);

  const createRouletteItems = () => {
    if (allBonus.length === 0) return [];
    
    const extendedList = [];
    for (let i = 0; i < totalSpins + 2; i++) {
      extendedList.push(...allBonus);
    }
    return extendedList;
  };

  const rouletteItems = createRouletteItems();

  const startChestAnimation = async () => {
    console.log('startChestAnimation called', { animationState, allBonusLength: allBonus.length });
    
    if (animationState !== 'idle') {
      console.log('Animation already running');
      return;
    }
    
    if (allBonus.length === 0) {
      console.log('No bonus loaded');
      return;
    }

    setAnimationState('spinning');
    console.log('Animation state set to spinning');

    try {
      if (!user || !user.id) {
        console.log('No user or user ID');
        return;
      }
      const result = await openChest(user.id);
      console.log('Chest opened, result:', result);
      
      if (!result) {
        setAnimationState('idle');
        return;
      }

      const bonusIndex = allBonus.findIndex(
        (b) => String(b.id) === String(result.id)
      );

      if (bonusIndex === -1) {
        setAnimationState('idle');
        return;
      }

      const finalLoopPosition = (totalSpins * allBonus.length) + bonusIndex;
      const finalPosition = -(finalLoopPosition - centerPosition) * itemHeight;

      console.log('Animation params:', { bonusIndex, finalLoopPosition, finalPosition });

      setDrawnBonus(result);
      setWinningIndex(bonusIndex);
      setRoulettePosition(finalPosition);

      setTimeout(() => {
        console.log('Animation finished');
        setAnimationState('finished');
      }, 5000);

    } catch (error) {
      console.error("Failed to open chest", error);
      setAnimationState('idle');
    }
  };

  const resetChest = () => {
    setAnimationState('idle');
    setDrawnBonus(null);
    setRoulettePosition(0);
    setWinningIndex(-1);
  };


  const chestImage = animationState === 'idle' 
    ? chestClosedImg
    : chestOpenedImg;

  return (
    <div className={`flex flex-col items-center bg-white dark:bg-gray-900 rounded-2xl shadow-2xl p-4 w-full ${!hasDrawn ? "pb-8" : "pb-3"}`}>
      <motion.img
        src={!hasDrawn ? chestImage : chestOpenedImg}
        alt="Chest"
        onClick={!hasDrawn && animationState === "idle" ? startChestAnimation : undefined}
        className={`
          w-28 h-28
          ${hasDrawn ? "opacity-50 cursor-not-allowed" : "cursor-pointer hover:scale-105"}
        `}
        initial={{ rotate: 0, scale: 1 }}
        animate={
          !hasDrawn && (animationState === "spinning" || animationState === "finished")
            ? { rotate: 20, scale: 1.1 }
            : { rotate: 0, scale: 1 }
        }
        transition={{ type: "spring", stiffness: 200, damping: 10 }}
        whileHover={!hasDrawn && animationState === "idle" ? { scale: 1.05 } : {}}
      />

      {animationState !== 'idle' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
              <div 
                className="relative bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900"
                style={{ width: 400, height: containerHeight }}
              >
                {animationState !== 'finished' && (
                  <div className="absolute left-0 right-0 z-20 border-t-4 border-b-4 border-red-500 bg-red-500/20"
                      style={{ 
                        top: centerPosition * itemHeight, 
                        height: itemHeight 
                      }}>
                    <div className="absolute left-2 top-1/2 transform -translate-y-1/2 text-red-500 font-bold">
                      →
                    </div>
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-red-500 font-bold">
                      ←
                    </div>
                  </div>
                )}


                <motion.div
                  className="absolute top-0 left-0 w-full"
                  initial={{ y: 0 }}
                  animate={{ 
                    y: animationState === 'spinning' ? roulettePosition : 0 
                  }}
                  transition={{
                    duration: animationState === 'spinning' ? 4 : 0,
                    ease: [0.25, 0.1, 0.25, 1.0]
                  }}
                >
                  {rouletteItems.map((bonus, index) => {
                    const isWinningItem = animationState === 'finished' && 
                                        index === (totalSpins * allBonus.length) + winningIndex;
                    
                    return (
                      <div
                        key={`${bonus.id}-${index}`}
                        className={`
                          flex items-center justify-center border-b border-gray-200 dark:border-gray-700
                          font-medium transition-all duration-200
                          ${isWinningItem 
                            ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 font-bold' 
                            : 'bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200'
                          }
                        `}
                        style={{ height: itemHeight }}
                      >
                        <span className="text-center px-4 truncate">
                          {bonus.name}
                        </span>
                      </div>
                    );
                  })}
                </motion.div>
              </div>

              {animationState === 'finished' && drawnBonus && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/90">
                  <div className="bg-white dark:bg-gray-900 rounded-xl p-8 shadow-2xl text-center max-w-sm mx-4">
                      <h3 className="text-2xl font-bold mb-3 text-gray-800 dark:text-gray-200">
                        Congratulations!
                      </h3>
                      <div className="text-xl font-semibold mb-2 text-blue-600 dark:text-blue-400">
                        {drawnBonus.name}
                      </div>
                      <div className="text-gray-600 dark:text-gray-400 mb-6">
                        {drawnBonus.description}
                      </div>
                      <button
                        onClick={resetChest}
                        className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 text-white font-semibold rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-200 transform hover:scale-105"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                )}

            </div>
          </div>
        )}
    </div>
  );
}