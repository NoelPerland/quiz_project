import Link from "next/link";
import Navbar from "./Navbar"; // Import Navbar
import { useContext, useState } from "react";
import { QuizContext } from "@/context/QuizContext";
import QuizCard from "@/components/QuizCard"; // Correct import

export default function Home() {
  const { questions } = useContext(QuizContext);
  const [started, setStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answered, setAnswered] = useState(false);
  const [score, setScore] = useState(0);

  // Called when the user selects an answer in QuizCard
  const handleAnswerSelected = (answer) => {
    if (answer.correct) {
      setScore(score + 1);
    }
    setAnswered(true);
  };

  // Advance to the next question
  const nextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setAnswered(false);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <Navbar /> {/* Use Navbar here */}
      {/* Hero Section */}
      {!started && (
        <section className="text-center max-w-3xl mt-20">
          <h1 className="text-4xl font-bold sm:text-5xl">
            Test Your Knowledge with <span>Quix</span>
          </h1>
          <p className="mt-4 text-lg">
            Challenge yourself with fun and interactive quizzes. Learn, compete,
            and improve your skills.
          </p>

          <Link href="#quiz">
            <button
              onClick={() => setStarted(true)}
              className="btn btn-secondary mt-6 px-6 py-3 font-semibold rounded-lg shadow-md transition"
            >
              Start Quiz
            </button>
          </Link>
        </section>
      )}
      {/* Quiz Section */}
      {started && questions.length > 0 && (
        <section className="h-96" id="quiz">
          <QuizCard
            key={questions[currentQuestionIndex].id}
            question={questions[currentQuestionIndex]}
            onAnswerSelected={handleAnswerSelected}
          />
          <div className="mt-4 text-center">
            {answered && currentQuestionIndex < questions.length - 1 && (
              <button onClick={nextQuestion} className="btn">
                Next
              </button>
            )}
            {answered && currentQuestionIndex === questions.length - 1 && (
              <p>
                Quiz Complete! {score} / {questions.length}
              </p>
            )}
          </div>
        </section>
      )}
    </div>
  );
}
