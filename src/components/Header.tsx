import { motion } from "motion/react";
import { Skull, ArrowLeft } from "lucide-react";

interface HeaderProps {
  showBackButton: boolean;
  onBackClick: () => void;
  onLogoClick: () => void;
}

export function Header({
  showBackButton,
  onBackClick,
  onLogoClick,
}: HeaderProps) {
  return (
    <header className="flex items-center justify-between mb-8 md:mb-12">
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100 }}
        className="flex items-center gap-2 md:gap-3 cursor-pointer group"
        onClick={onLogoClick}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div 
          className="w-9 h-9 md:w-10 md:h-10 bg-backstabber-red rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20"
          whileHover={{ scale: 1.05, rotate: 5 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <Skull className="text-white w-5 h-5 md:w-6 md:h-6" />
        </motion.div>
        <div>
          <h1 className="font-serif text-lg md:text-xl font-bold tracking-tight">
            Backstabbers
          </h1>
          <p className="text-[9px] md:text-[10px] uppercase tracking-[0.15em] md:tracking-[0.2em] text-white/40 font-bold">
            English Learning
          </p>
        </div>
      </motion.div>

      {showBackButton && (
        <motion.button
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          onClick={onBackClick}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          className="p-2 hover:bg-white/5 rounded-full transition-colors active:bg-white/10"
        >
          <ArrowLeft className="w-5 h-5 md:w-6 md:h-6" />
        </motion.button>
      )}
    </header>
  );
}
