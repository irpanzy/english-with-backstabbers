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
      className="space-y-8"
    >
      <div className="space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-backstabber-red/10 text-backstabber-red text-xs font-bold uppercase tracking-wider">
          <BookOpen className="w-3 h-3" />
          Lesson
        </div>
        <h2 className="text-3xl font-serif font-bold">
          {lessonData.lesson_title}
        </h2>
        <p className="text-white/60 italic">"{lessonData.objective}"</p>
      </div>

      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">
          Vocabulary
        </h3>
        <div className="grid gap-3">
          {lessonData.vocabulary.map((item, idx) => (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={item.en}
              className="glass-card p-4 flex items-center justify-between"
            >
              <span className="font-bold text-lg">{item.en}</span>
              <span className="text-white/40 font-medium">{item.id}</span>
            </motion.div>
          ))}
        </div>
      </div>

      <button
        onClick={onStartQuiz}
        className="btn-primary w-full flex items-center justify-center gap-2"
      >
        Start Quiz
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}
