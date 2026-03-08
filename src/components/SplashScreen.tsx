import { motion } from "motion/react";
import { Skull, Sparkles } from "lucide-react";

export function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black overflow-hidden relative px-4"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-backstabber-red rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.1, 0.15, 0.1],
          }}
          transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
          className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-purple-600 rounded-full blur-3xl"
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center space-y-8">
        {/* Logo with animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1, delay: 0.2 }}
          className="flex justify-center mb-8"
        >
          <div className="relative">
            <motion.div
              animate={{
                boxShadow: [
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                  "0 0 60px rgba(239, 68, 68, 0.6)",
                  "0 0 20px rgba(239, 68, 68, 0.3)",
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-24 h-24 bg-backstabber-red rounded-2xl flex items-center justify-center"
            >
              <Skull className="text-white w-12 h-12" />
            </motion.div>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-4 border-2 border-backstabber-red/30 rounded-3xl"
            />
          </div>
        </motion.div>

        {/* Title with stagger animation */}
        <div className="space-y-4 px-4">
          <motion.h1
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
            className="font-serif text-4xl md:text-5xl font-bold tracking-tight"
          >
            Backstabbers
          </motion.h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-white/60 font-bold"
          >
            English Learning Platform
          </motion.p>
        </div>

        {/* Loading indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="flex flex-col items-center gap-4 mt-12"
        >
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
                className="w-3 h-3 bg-backstabber-red rounded-full"
              />
            ))}
          </div>
          <motion.p
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-xs text-white/40 uppercase tracking-widest"
          >
            Loading Experience...
          </motion.p>
        </motion.div>
      </div>

      {/* Sparkle effects */}
      <motion.div
        animate={{
          scale: [0, 1, 0],
          rotate: [0, 180, 360],
        }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.3 }}
        className="absolute top-10 right-4 md:top-20 md:right-20"
      >
        <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-yellow-400" />
      </motion.div>
      <motion.div
        animate={{
          scale: [0, 1, 0],
          rotate: [0, -180, -360],
        }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.8 }}
        className="absolute bottom-20 left-4 md:bottom-32 md:left-16"
      >
        <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-purple-400" />
      </motion.div>
    </motion.div>
  );
}
