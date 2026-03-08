import { motion } from "motion/react";
import { Loader2, Sparkles } from "lucide-react";

export default function LoadingScreen() {
  return (
    <motion.div
      key="loading"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="h-full flex flex-col items-center justify-center text-center space-y-6 py-20"
    >
      <div className="relative">
        <Loader2 className="w-12 h-12 animate-spin text-backstabber-red" />
        <Sparkles className="w-6 h-6 text-yellow-400 absolute -top-2 -right-2 animate-pulse" />
      </div>
      <div>
        <h3 className="text-xl font-bold">Preparing your lesson...</h3>
        <p className="text-white/40">
          Our AI is crafting the perfect content for you.
        </p>
      </div>
    </motion.div>
  );
}
