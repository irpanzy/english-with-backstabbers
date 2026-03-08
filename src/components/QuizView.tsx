import { motion, AnimatePresence } from "motion/react";
import { CheckCircle2, XCircle } from "lucide-react";
import { QuizQuestion } from "../services/geminiService";

interface QuizViewProps {
  question: QuizQuestion;
  currentIndex: number;
  totalQuestions: number;
  selectedOption: string | null;
  isAnswered: boolean;
  onAnswer: (option: string) => void;
  onNext: () => void;
}

export function QuizView({
  question,
  currentIndex,
  totalQuestions,
  selectedOption,
  isAnswered,
  onAnswer,
  onNext,
}: QuizViewProps) {
  return (
    <motion.div
      key={`quiz-${currentIndex}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="space-y-6 md:space-y-8"
    >
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-[10px] md:text-xs font-bold uppercase tracking-widest text-white/40">
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span>
            {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-linear-to-r from-backstabber-red to-pink-500"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
            }}
            transition={{ type: "spring", stiffness: 50 }}
          />
        </div>
      </div>

      <div className="space-y-4 md:space-y-6">
        <motion.h2 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-xl md:text-2xl font-bold leading-tight"
        >
          {question.question}
        </motion.h2>

        <div className="grid gap-2 md:gap-3">
          {question.options.map((option, idx) => {
            const isCorrect = option === question.correct_answer;
            const isSelected = selectedOption === option;

            let bgColor = "bg-white/5 hover:bg-white/10";
            let borderColor = "border-white/10";

            if (isAnswered) {
              if (isCorrect) {
                bgColor = "bg-emerald-500/20";
                borderColor = "border-emerald-500/50";
              } else if (isSelected) {
                bgColor = "bg-red-500/20";
                borderColor = "border-red-500/50";
              }
            } else if (isSelected) {
              borderColor = "border-backstabber-red";
            }

            return (
              <motion.button
                key={option}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.05 + 0.2 }}
                whileHover={!isAnswered ? { scale: 1.02, x: 4 } : {}}
                whileTap={!isAnswered ? { scale: 0.98 } : {}}
                disabled={isAnswered}
                onClick={() => onAnswer(option)}
                className={`w-full p-4 md:p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between touch-manipulation ${bgColor} ${borderColor}`}
              >
                <span className="font-medium text-sm md:text-base pr-2">{option}</span>
                <AnimatePresence>
                  {isAnswered && isCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    </motion.div>
                  )}
                  {isAnswered && isSelected && !isCorrect && (
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 200 }}
                    >
                      <XCircle className="w-5 h-5 text-red-500 shrink-0" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -20, height: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
            className="space-y-4 md:space-y-6"
          >
            <motion.div 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              className="p-4 md:p-5 rounded-2xl bg-white/5 border border-white/10"
            >
              <p className="text-xs md:text-sm text-white/60 leading-relaxed">
                <span className="font-bold text-white block mb-1">
                  Explanation:
                </span>
                {question.explanation}
              </p>
            </motion.div>
            <motion.button 
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={onNext} 
              className="btn-primary w-full py-4 text-base md:text-lg"
            >
              {currentIndex < totalQuestions - 1
                ? "Next Question"
                : "Finish Quiz"}
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
