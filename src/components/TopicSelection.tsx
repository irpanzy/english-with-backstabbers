import { motion } from "motion/react";
import { ChevronRight } from "lucide-react";
import { ErrorMessage } from "./ErrorMessage";

interface TopicSelectionProps {
  topics: string[];
  onTopicSelect: (topic: string) => void;
  error?: string | null;
  onErrorClose?: () => void;
}

export function TopicSelection({ topics, onTopicSelect, error, onErrorClose }: TopicSelectionProps) {
  return (
    <motion.div
      key="home"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="space-y-6"
    >
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6 md:mb-8"
      >
        <h2 className="text-2xl md:text-3xl font-serif font-bold mb-2">Ready to learn?</h2>
        <p className="text-sm md:text-base text-white/60">
          Choose a topic to start your bite-sized lesson.
        </p>
      </motion.div>

      {/* Error Message */}
      {error && onErrorClose && (
        <ErrorMessage message={error} onClose={onErrorClose} />
      )}

      <div className="grid gap-3 md:gap-4">
        {topics.map((topic, idx) => (
          <motion.button
            key={topic}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.05 + 0.2, type: "spring", stiffness: 100 }}
            whileHover={{ scale: 1.02, x: 4 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onTopicSelect(topic)}
            className="glass-card p-4 md:p-5 flex items-center justify-between group hover:bg-white/10 transition-all text-left touch-manipulation"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <motion.div 
                className="w-10 h-10 md:w-12 md:h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-backstabber-red transition-colors shrink-0"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <span className="font-mono text-xs md:text-sm font-bold">0{idx + 1}</span>
              </motion.div>
              <div className="min-w-0">
                <h3 className="font-bold text-base md:text-lg truncate">{topic}</h3>
                <p className="text-xs md:text-sm text-white/40">Beginner Level</p>
              </div>
            </div>
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight className="w-4 h-4 md:w-5 md:h-5 text-white/20 group-hover:text-white transition-colors shrink-0" />
            </motion.div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
