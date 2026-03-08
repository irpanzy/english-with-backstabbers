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
      key="quiz"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      className="space-y-8"
    >
      {/* Progress Bar */}
      <div className="space-y-2">
        <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/40">
          <span>
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          <span>
            {Math.round(((currentIndex + 1) / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-white/5 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-backstabber-red"
            initial={{ width: 0 }}
            animate={{
              width: `${((currentIndex + 1) / totalQuestions) * 100}%`,
            }}
          />
        </div>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold leading-tight">
          {question.question}
        </h2>

        <div className="grid gap-3">
          {question.options.map((option) => {
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
              <button
                key={option}
                disabled={isAnswered}
                onClick={() => onAnswer(option)}
                className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${bgColor} ${borderColor}`}
              >
                <span className="font-medium">{option}</span>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                )}
                {isAnswered && isSelected && !isCorrect && (
                  <XCircle className="w-5 h-5 text-red-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="p-5 rounded-2xl bg-white/5 border border-white/10">
              <p className="text-sm text-white/60 leading-relaxed">
                <span className="font-bold text-white block mb-1">
                  Explanation:
                </span>
                {question.explanation}
              </p>
            </div>
            <button onClick={onNext} className="btn-primary w-full">
              {currentIndex < totalQuestions - 1
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
