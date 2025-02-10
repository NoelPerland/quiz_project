import Link from "next/link";
import Navbar from "./Navbar";
import { useContext, useState } from "react";
import { QuizContext } from "@/context/QuizContext";
import QuizCard from "@/components/QuizCard";
import { RiRefreshLine } from "react-icons/ri";

export default function Home() {
  const { questions } = useContext(QuizContext);
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  const handleAnswerSelected = (answer) => {
    if (answer.correct) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setAnswered(false);
  };

  function restartQuiz() {
    setCurrentQuestionIndex(0);
    setScore(0);
    setAnswered(false);
  }

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center px-6  bg-gradient-to-b
     from-green-200 via-base-200 to-green-200 text-base-content"
    >
      <Navbar />
      {!started && (
        <section className="text-center max-w-3xl mt-20 p-6">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Test Your Knowledge with <span className="text-accent">Quix</span>
            <span>!</span>
          </h1>
          <p className="mt-4 text-lg opacity-80">
            Challenge yourself with fun and interactive quizzes. Learn, compete,
            and improve your skills.
          </p>
          <button
            onClick={() => setStarted(true)}
            className="btn btn-accent
             mt-6 px-6 py-3 font-semibold rounded-lg transition hover:opacity-80"
          >
            Start Quiz
          </button>
        </section>
      )}
      {started && questions.length > 0 && (
        <section className="w-full max-w-2xl mt-10" id="quiz">
          <QuizCard
            key={questions[currentQuestionIndex].id}
            question={questions[currentQuestionIndex]}
            currentIndex={currentQuestionIndex}
            totalQuestions={questions.length}
            onAnswerSelected={handleAnswerSelected}
          />
          <div className="mt-6 flex justify-center min-h-[50px]">
            {answered && currentQuestionIndex < questions.length - 1 && (
              <button onClick={nextQuestion} className="btn btn-accent">
                Next
              </button>
            )}
            {answered && currentQuestionIndex === questions.length - 1 && (
              <div className="text-center">
                <p className="text-2xl font-bold mb-8">
                  Quiz Complete! You scored{" "}
                  <span className="text-primary">{score}</span> /{" "}
                  {questions.length}.
                  <br />
                  {score === questions.length
                    ? "🥇 Perfect score! You're a quiz master! 🚀"
                    : score >= questions.length * 0.7
                    ? "🔥 Awesome job! Keep it up!"
                    : score >= questions.length * 0.4
                    ? "👍 Not bad! Keep practicing!"
                    : "💡 Keep learning! You'll do better next time!"}
                </p>

                <button
                  onClick={restartQuiz}
                  className="btn btn-accent flex items-center gap-2 text-base mx-auto"
                >
                  Start Over <RiRefreshLine className="w-12 h-8" />
                </button>
              </div>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
