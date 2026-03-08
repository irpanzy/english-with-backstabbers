import { motion } from "motion/react";
import { Trophy, RotateCcw, Sparkles, Star } from "lucide-react";

interface ResultViewProps {
  score: number;
  totalQuestions: number;
  onRetry: () => void;
  onHome: () => void;
}

const confettiColors = [
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

export function ResultView({
  score,
  totalQuestions,
  onRetry,
  onHome,
}: ResultViewProps) {
  const percentage = (score / totalQuestions) * 100;
  const isPerfect = score === totalQuestions;
  const isGood = percentage >= 70;

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center space-y-6 md:space-y-8 py-8 md:py-12 relative overflow-hidden"
    >
      {isGood && (
        <>
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: "50vw",
                y: -20,
                scale: 0,
                rotate: 0,
              }}
              animate={{
                x: Math.random() * window.innerWidth - window.innerWidth / 2,
                y: window.innerHeight + 100,
                scale: [0, 1, 1, 0.5],
                rotate: Math.random() * 720 - 360,
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                delay: i * 0.1,
                ease: "easeOut",
              }}
              className="absolute pointer-events-none"
              style={{
                left: "50%",
                top: 0,
              }}
            >
              <div
                className="w-3 h-3 rounded-full"
                style={{
                  backgroundColor:
                    confettiColors[
                      Math.floor(Math.random() * confettiColors.length)
                    ],
                }}
              />
            </motion.div>
          ))}
        </>
      )}
      {isPerfect && (
        <>
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={`star-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
                repeatDelay: 1,
              }}
              className="absolute"
              style={{
                left: `${15 + i * 10}%`,
                top: `${20 + (i % 2) * 40}%`,
              }}
            >
              <Star className="w-4 h-4 md:w-6 md:h-6 text-yellow-400 fill-yellow-400" />
            </motion.div>
          ))}
        </>
      )}

      <div className="relative inline-block">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 100, delay: 0.2 }}
          className="w-28 h-28 md:w-32 md:h-32 bg-backstabber-red/20 rounded-full flex items-center justify-center mx-auto relative"
        >
          <motion.div
            animate={
              isPerfect
                ? {
                    rotate: [0, 10, -10, 10, 0],
                    scale: [1, 1.1, 1, 1.1, 1],
                  }
                : {}
            }
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 1 }}
          >
            <Trophy className="w-14 h-14 md:w-16 md:h-16 text-backstabber-red" />
          </motion.div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 border-2 border-dashed border-backstabber-red/30 rounded-full"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.5, stiffness: 200 }}
          className="absolute -top-2 -right-2 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-sm shadow-lg"
        >
          <motion.span
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          >
            +{score * 10} XP
          </motion.span>
        </motion.div>
      </div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        <motion.h2
          className="text-3xl md:text-4xl font-serif font-bold mb-2"
          animate={
            isPerfect
              ? {
                  scale: [1, 1.05, 1],
                }
              : {}
          }
          transition={{ duration: 2, repeat: Infinity }}
        >
          {isPerfect
            ? "Perfect Score! 🎉"
            : isGood
              ? "Great Job!"
              : "Good Try!"}
        </motion.h2>
        <p className="text-sm md:text-base text-white/60">
          You scored{" "}
          <motion.span
            className="text-white font-bold text-xl md:text-2xl"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", delay: 0.4 }}
          >
            {score}
          </motion.span>{" "}
          out of <span className="text-white font-bold">{totalQuestions}</span>
        </p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-4 max-w-xs mx-auto"
        >
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${percentage}%` }}
              transition={{ duration: 1, delay: 0.7, type: "spring" }}
              className="h-full bg-linear-to-r from-backstabber-red to-pink-500"
            />
          </div>
          <p className="text-xs text-white/40 mt-1">
            {Math.round(percentage)}% Correct
          </p>
        </motion.div>
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="grid grid-cols-2 gap-3 md:gap-4 max-w-md mx-auto"
      >
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onRetry}
          className="btn-secondary flex items-center justify-center gap-2 py-3 md:py-4"
        >
          <RotateCcw className="w-4 h-4 md:w-5 md:h-5" />
          <span className="text-sm md:text-base">Retry</span>
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onHome}
          className="btn-primary py-3 md:py-4 text-sm md:text-base"
        >
          Home
        </motion.button>
      </motion.div>
    </motion.div>
  );
}
