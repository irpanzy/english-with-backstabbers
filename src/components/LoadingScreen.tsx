import { motion } from "motion/react";
import { Loader2, Sparkles } from "lucide-react";

export function LoadingScreen() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20 px-4"
    >
      <div className="relative">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <Loader2 className="w-12 h-12 md:w-16 md:h-16 text-backstabber-red" />
        </motion.div>
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-400 absolute -top-2 -right-2" />
        </motion.div>
      </div>
      
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className="text-xl md:text-2xl font-bold mb-2">Preparing your lesson...</h3>
        <motion.p 
          className="text-sm md:text-base text-white/40"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Our AI is crafting the perfect content for you.
        </motion.p>
      </motion.div>

      {/* Animated dots */}
      <div className="flex gap-2">
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            animate={{
              y: [0, -10, 0],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{
              duration: 0.8,
              repeat: Infinity,
              delay: i * 0.2,
            }}
            className="w-2 h-2 md:w-3 md:h-3 bg-backstabber-red rounded-full"
          />
        ))}
      </div>
    </motion.div>
  );
}
