import { motion } from "motion/react";
import { BookOpen, ChevronRight } from "lucide-react";
import { LessonData } from "../services/geminiService";

interface LessonViewProps {
  lessonData: LessonData;
  onStartQuiz: () => void;
}

export function LessonView({ lessonData, onStartQuiz }: LessonViewProps) {
  return (
    <motion.div
      key="lesson"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 md:space-y-8"
    >
      <motion.div 
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="space-y-2"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: "spring" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-backstabber-red/10 text-backstabber-red text-xs font-bold uppercase tracking-wider"
        >
          <BookOpen className="w-3 h-3" />
          Lesson
        </motion.div>
        <h2 className="text-2xl md:text-3xl font-serif font-bold">
          {lessonData.lesson_title}
        </h2>
        <p className="text-sm md:text-base text-white/60 italic">"{lessonData.objective}"</p>
      </motion.div>

      <div className="space-y-3 md:space-y-4">
        <h3 className="text-xs md:text-sm font-bold uppercase tracking-widest text-white/40">
          Vocabulary
        </h3>
        <div className="grid gap-2 md:gap-3">
          {lessonData.vocabulary.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10, rotateX: -15 }}
              animate={{ opacity: 1, y: 0, rotateX: 0 }}
              transition={{ 
                delay: idx * 0.1, 
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ scale: 1.02, y: -2 }}
              key={item.en}
              className="glass-card p-3 md:p-4 flex items-center justify-between touch-manipulation"
            >
              <span className="font-bold text-base md:text-lg">{item.en}</span>
              <span className="text-sm md:text-base text-white/40 font-medium">{item.id}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: lessonData.vocabulary.length * 0.1 + 0.2 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStartQuiz}
        className="btn-primary w-full flex items-center justify-center gap-2 py-4 text-base md:text-lg"
      >
        Start Quiz
        <motion.div
          animate={{ x: [0, 4, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <ChevronRight className="w-5 h-5" />
        </motion.div>
      </motion.button>
    </motion.div>
  );
}
