import { useEffect, useState } from "react";
import { motion, type Transition } from "framer-motion";
import { fetchCrystalStatus } from "../../services/crystalService";
import crystalImg from '../../assets/crystal.png';
import crystalDamagedImg from '../../assets/crystal_damaged.png';
import absorbImg from '../../assets/crystal_absorbed.png';
import fixImg from '../../assets/crystal_fixed.png';
import holdImg from '../../assets/crystal_held.png';

interface CrystalSectionProps {
  action: "absorb" | "repair" | "hold" | null;
}

export default function CrystalSection({ action }: CrystalSectionProps) {
  const [status_, setStatus] = useState<string>("");
  const [percentage, setPercentage] = useState<number>(33);
  const [statusImage, setStatusImage] = useState(crystalImg);

  const [currentImage, setCurrentImage] = useState(crystalImg);

  useEffect(() => {
    if (action) {
      switch (action) {
        case "absorb":
          setCurrentImage(absorbImg);
          break;
        case "hold":
          setCurrentImage(holdImg);
          break;
        case "repair":
          setCurrentImage(fixImg);
          break;
      }

      if (action !== "repair") {
        const timer = setTimeout(() => {
          setCurrentImage(statusImage);
        }, 1000);
        return () => clearTimeout(timer);
      }
    }
  }, [action]);

  const getCrystalStatus = async () => {
    try {
      const crystalStatus = await fetchCrystalStatus();
      setStatus(crystalStatus);
    }
    catch {
      console.error("Failed to fetch crystal status_");
    }
  }
  
  useEffect(() => {
    getCrystalStatus();
  }, []);

  useEffect(() => {
    if(!status_) return;

    let crystalPercentage = status_ === "healthy" ? 100 : status_ === "damaged" ? 66 : status_ === "critical" ? 33 : 0;
    setPercentage(crystalPercentage);

    const newStatusImage = status_ === "damaged" ? crystalDamagedImg : crystalImg;
    setStatusImage(newStatusImage);
    setCurrentImage(newStatusImage);
    
  }
  , [status_]);

  const getAnimation = () => {
    switch(action) {
      case "absorb":
        return { 
          x: [0, -12, 8, -7, 10, -5, 6, -8, 4, 0], 
          y: [0, -4, 5, -3, 6, -5, 4, -6, 3, 0], 
          rotate: [0, -18, 15, -12, 20, -10, 12, -15, 8, 0],
          scale: [1, 1.08, 0.95, 1.06, 0.97, 1.07, 1, 1.05, 0.96, 1]
        };
      case "hold":
        return {
          y: [0, -3, 2, -2, 1, 0],
          x: [0, 1, -1, 0, 0],
          rotate: [0, 2, -2, 1, 0],
          scale: [1, 1.02, 0.98, 1]
        };
      case "repair":
        return {
          scale: [1, 1.3, 1, 1]
        };
      default:
        return { y: [0, -3, 0] };
    }
  };

  const getTransition = (): Transition => {
    switch(action) {
      case "absorb":
        return { duration: 1, ease: "easeInOut", repeat: 0 };
      case "hold":
        return { duration: 1, ease: "easeInOut", repeat: 0 };
      case "repair":
        return { 
          duration: 1, 
          times: [0, 0.7, 0.85, 1],
          ease: ["easeOut", "easeIn", "linear"],
          repeat: 0
        };
      default:
        return { repeat: Infinity, repeatType: "reverse", duration: 2 };
    }
  }

  return (
    <div className="flex flex-col items-center justify-center bg-white/70 dark:bg-gray-800/70 backdrop-blur-md rounded-xl shadow-lg border border-white/30 dark:border-gray-700/50 p-6 min-h-[220px] w-full">
      <motion.img 
        src={currentImage} 
        alt="Crystal"
        className="h-25 mb-4"
        animate={getAnimation()}
        transition={getTransition()}
      />

      <div className="w-full h-2 mt-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner w-full max-w-xs">
        <div 
          className={`h-full transition-all duration-500 ease-in-out
            ${status_ == "critical" ? "bg-red-500" : status_ == "damaged" ? "bg-yellow-500" : "bg-green-500"}`} 
          style={{ width: `${percentage}%` }} 
        ></div>
      </div>

      <p className={`mt-2 font-semibold ${status_ == "critical" ? "text-red-500" : status_ == "damaged" ? "text-yellow-500" : "text-green-500"}`}>
        {status_.toUpperCase()}
      </p>
    </div>
  );
}
