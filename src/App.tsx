import { useState, useEffect } from "react";
import { AnimatePresence } from "motion/react";
import { Analytics } from "@vercel/analytics/react";
import { generateLesson, LessonData } from "./services/geminiService";
import { SplashScreen } from "./components/SplashScreen";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";
import { TopicSelection } from "./components/TopicSelection";
import { LoadingScreen } from "./components/LoadingScreen";
import { LessonView } from "./components/LessonView";
import { QuizView } from "./components/QuizView";
import { ResultView } from "./components/ResultView";

const TOPICS = [
  "Greetings & Introductions",
  "Ordering Coffee",
  "Asking for Directions",
  "Talking about Hobbies",
  "Work & Career",
  "Travel & Vacation",
  "Shopping & Prices",
  "Daily Routine",
];

type AppState = "splash" | "home" | "loading" | "lesson" | "quiz" | "result";

export default function App() {
  const [state, setState] = useState<AppState>("splash");
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSplash(false);
      setState("home");
    }, 3000);
    return () => clearTimeout(timer);
  }, []);
  const [currentTopic, setCurrentTopic] = useState<string>("");
  const [lessonData, setLessonData] = useState<LessonData | null>(null);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const startLesson = async (topic: string) => {
    setCurrentTopic(topic);
    setState("loading");
    setError(null);
    try {
      const data = await generateLesson(topic);
      setLessonData(data);
      setState("lesson");
    } catch (err: any) {
      const errorMessage = err?.message || "Failed to load lesson. Please try again.";
      setError(errorMessage);
      setState("home");
    }
  };

  const handleNextQuiz = () => {
    if (!lessonData) return;
    if (currentQuizIndex < lessonData.quiz.length - 1) {
      setCurrentQuizIndex((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setState("result");
    }
  };

  const handleAnswer = (option: string) => {
    if (isAnswered || !lessonData) return;
    setSelectedOption(option);
    setIsAnswered(true);
    if (option === lessonData.quiz[currentQuizIndex].correct_answer) {
      setScore((prev) => prev + 1);
    }
  };

  const reset = () => {
    setState("home");
    setLessonData(null);
    setCurrentQuizIndex(0);
    setScore(0);
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (showSplash) {
    return <SplashScreen />;
  }

  return (
    <div className="min-h-screen max-w-2xl mx-auto px-4 md:px-6 py-6 md:py-8 flex flex-col">
      <Header
        showBackButton={state !== "home"}
        onBackClick={reset}
        onLogoClick={reset}
      />

      <main className="flex-1">
        <AnimatePresence mode="wait">
          {state === "home" && (
            <TopicSelection 
              topics={TOPICS} 
              onTopicSelect={startLesson}
              error={error}
              onErrorClose={() => setError(null)}
            />
          )}

          {state === "loading" && <LoadingScreen />}

          {state === "lesson" && lessonData && (
            <LessonView
              lessonData={lessonData}
              onStartQuiz={() => setState("quiz")}
            />
          )}

          {state === "quiz" && lessonData && (
            <QuizView
              question={lessonData.quiz[currentQuizIndex]}
              currentIndex={currentQuizIndex}
              totalQuestions={lessonData.quiz.length}
              selectedOption={selectedOption}
              isAnswered={isAnswered}
              onAnswer={handleAnswer}
              onNext={handleNextQuiz}
            />
          )}

          {state === "result" && lessonData && (
            <ResultView
              score={score}
              totalQuestions={lessonData.quiz.length}
              onRetry={() => startLesson(currentTopic)}
              onHome={reset}
            />
          )}
        </AnimatePresence>
      </main>

      <Footer />
      <Analytics />
    </div>
  );
}
