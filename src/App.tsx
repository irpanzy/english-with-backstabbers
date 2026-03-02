import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Trophy, 
  ChevronRight, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Loader2,
  Sparkles,
  ArrowLeft,
  Skull
} from 'lucide-react';
import { generateLesson, LessonData, VocabularyItem, QuizQuestion } from './services/geminiService';

const TOPICS = [
  "Greetings & Introductions",
  "Ordering Coffee",
  "Asking for Directions",
  "Talking about Hobbies",
  "Work & Career",
  "Travel & Vacation",
  "Shopping & Prices",
  "Daily Routine"
];

type AppState = 'home' | 'loading' | 'lesson' | 'quiz' | 'result';

export default function App() {
  const [state, setState] = useState<AppState>('home');
  const [currentTopic, setCurrentTopic] = useState<string>('');
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startLesson = async (topic: string) => {
    setCurrentTopic(topic);
    setState('loading');
    setError(null);
    try {
      const data = await generateLesson(topic);
      setLessonData(data);
      setState('lesson');
    } catch (err) {
      console.error(err);
      setError("Failed to load lesson. Please try again.");
      setState('home');
    }
  };

  const handleNextQuiz = () => {
    if (!lessonData) return;
    if (currentQuizIndex < lessonData.quiz.length - 1) {
      setCurrentQuizIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setState('result');
    }
  };

  const handleAnswer = (option: string) => {
    if (isAnswered || !lessonData) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === lessonData.quiz[currentQuizIndex].correct_answer) {
      setScore(prev => prev + 1);
    }
  };

  const reset = () => {
    setState('home');
    setLessonData(null);
    setCurrentQuizIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  return (
    <div className="min-h-screen max-w-2xl mx-auto px-4 py-8 flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between mb-12">
        <div className="flex items-center gap-3 cursor-pointer" onClick={reset}>
          <div className="w-10 h-10 bg-backstabber-red rounded-xl flex items-center justify-center shadow-lg shadow-red-500/20">
            <Skull className="text-white w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-xl font-bold tracking-tight">Backstabbers</h1>
            <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold">English Learning</p>
          </div>
        </div>
        
        {state !== 'home' && (
          <button 
            onClick={reset}
            className="p-2 hover:bg-white/5 rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
        )}
      </header>

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {state === 'home' && (
            <motion.div
              key="home"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-6"
            >
              <div className="mb-8">
                <h2 className="text-3xl font-serif font-bold mb-2">Ready to learn?</h2>
                <p className="text-white/60">Choose a topic to start your bite-sized lesson.</p>
              </div>

              <div className="grid gap-4">
                {TOPICS.map((topic, idx) => (
                  <button
                    key={topic}
                    onClick={() => startLesson(topic)}
                    className="glass-card p-5 flex items-center justify-between group hover:bg-white/10 transition-all text-left"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-white/40 group-hover:text-backstabber-red transition-colors">
                        <span className="font-mono text-sm font-bold">0{idx + 1}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">{topic}</h3>
                        <p className="text-sm text-white/40">Beginner Level</p>
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5 text-white/20 group-hover:text-white transition-colors" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}

          {state === 'loading' && (
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
                <p className="text-white/40">Our AI is crafting the perfect content for you.</p>
              </div>
            </motion.div>
          )}

          {state === 'lesson' && lessonData && (
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
                <h2 className="text-3xl font-serif font-bold">{lessonData.lesson_title}</h2>
                <p className="text-white/60 italic">"{lessonData.objective}"</p>
              </div>

              <div className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-widest text-white/40">Vocabulary</h3>
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
                onClick={() => setState('quiz')}
                className="btn-primary w-full flex items-center justify-center gap-2"
              >
                Start Quiz
                <ChevronRight className="w-5 h-5" />
              </button>
            </motion.div>
          )}

          {state === 'quiz' && lessonData && (
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
                  <span>Question {currentQuizIndex + 1} of {lessonData.quiz.length}</span>
                  <span>{Math.round(((currentQuizIndex + 1) / lessonData.quiz.length) * 100)}%</span>
                </div>
                <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    className="h-full bg-backstabber-red"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentQuizIndex + 1) / lessonData.quiz.length) * 100}%` }}
                  />
                </div>
              </div>

              <div className="space-y-6">
                <h2 className="text-2xl font-bold leading-tight">
                  {lessonData.quiz[currentQuizIndex].question}
                </h2>

                <div className="grid gap-3">
                  {lessonData.quiz[currentQuizIndex].options.map((option) => {
                    const isCorrect = option === lessonData.quiz[currentQuizIndex].correct_answer;
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
                        onClick={() => handleAnswer(option)}
                        className={`w-full p-5 rounded-2xl border-2 text-left transition-all flex items-center justify-between ${bgColor} ${borderColor}`}
                      >
                        <span className="font-medium">{option}</span>
                        {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                        {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-red-500" />}
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
                        <span className="font-bold text-white block mb-1">Explanation:</span>
                        {lessonData.quiz[currentQuizIndex].explanation}
                      </p>
                    </div>
                    <button 
                      onClick={handleNextQuiz}
                      className="btn-primary w-full"
                    >
                      {currentQuizIndex < lessonData.quiz.length - 1 ? 'Next Question' : 'Finish Quiz'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}

          {state === 'result' && lessonData && (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center space-y-8 py-12"
            >
              <div className="relative inline-block">
                <div className="w-32 h-32 bg-backstabber-red/20 rounded-full flex items-center justify-center mx-auto">
                  <Trophy className="w-16 h-16 text-backstabber-red" />
                </div>
                <motion.div 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', delay: 0.5 }}
                  className="absolute -top-2 -right-2 bg-yellow-400 text-black font-bold px-3 py-1 rounded-full text-sm"
                >
                  +{score * 10} XP
                </motion.div>
              </div>

              <div>
                <h2 className="text-4xl font-serif font-bold mb-2">Lesson Complete!</h2>
                <p className="text-white/60">
                  You scored <span className="text-white font-bold">{score}</span> out of <span className="text-white font-bold">{lessonData.quiz.length}</span>
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <button 
                  onClick={() => startLesson(currentTopic)}
                  className="btn-secondary flex items-center justify-center gap-2"
                >
                  <RotateCcw className="w-5 h-5" />
                  Retry
                </button>
                <button 
                  onClick={reset}
                  className="btn-primary"
                >
                  Home
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Footer / Status */}
      <footer className="mt-12 pt-8 border-t border-white/5 flex items-center justify-between text-[10px] uppercase tracking-widest text-white/20 font-bold">
        <span>v1.0.0</span>
        <span>English With Backstabbers</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </div>
  );
}
