import { motion, AnimatePresence } from "motion/react";
import { AlertCircle, X } from "lucide-react";

interface ErrorMessageProps {
  message: string | null;
  onClose: () => void;
}

export function ErrorMessage({ message, onClose }: ErrorMessageProps) {
  if (!message) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.95 }}
        className="mb-6"
      >
        <div className="bg-red-500/10 border border-red-500/50 rounded-2xl p-4 flex items-start gap-3">
          <motion.div
            animate={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <AlertCircle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
          </motion.div>
          <div className="flex-1 min-w-0">
            <p className="text-sm md:text-base text-red-200 leading-relaxed">
              {message}
            </p>
          </div>
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="p-1 hover:bg-red-500/20 rounded-full transition-colors shrink-0"
          >
            <X className="w-4 h-4 text-red-400" />
          </motion.button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
