import { motion } from "motion/react";
import { Trophy, RotateCcw } from "lucide-react";

interface ResultViewProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  onHome: () => void;
}

export default function ResultView({ score, totalQuestions, onRetry, onHome }: ResultViewProps) {
  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-8 py-12"
    >
      <div className="relative inline-block">
        <div className="w-32 h-32 bg-backstabber-red/20 rounded-full flex items-center justify-center mx-auto">
          <Trophy className="w-16 h-16 text-backstabber-red" />
        </div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5 }}
          className="absolute -top-2 -right-2 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-sm"
        >
          +{score * 10} XP
        </motion.div>
      </div>

      <div>
        <h2 className="text-4xl font-serif font-bold mb-2">
          Lesson Complete!
        </h2>
        <p className="text-white/60">
          You scored{" "}
          <span className="text-white font-bold">{score}</span> out of{" "}
          <span className="text-white font-bold">{totalQuestions}</span>
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <button
          onClick={onRetry}
          className="btn-secondary flex items-center justify-center gap-2"
        >
          <RotateCcw className="w-5 h-5" />
          Retry
        </button>
        <button onClick={onHome} className="btn-primary">
          Home
        </button>
      </div>
    </motion.div>
  );
}
