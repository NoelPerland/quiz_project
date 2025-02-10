import { useState } from "react";

export default function QuizCard({
  question,
  currentIndex,
  totalQuestions,
  onAnswerSelected,
}) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);

  function handleAnswerClick(answer) {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      if (onAnswerSelected) {
        onAnswerSelected(answer);
      }
    }
  }

  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body">
        Question {currentIndex + 1} / {totalQuestions}
        <h3 className="card-title text-xl mx-auto font-semibold">
          {question.question}
        </h3>
        <div className="mt-4 space-y-2">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className={`btn w-full p-2 transition ${
                isAnswered
                  ? answer.correct
                    ? "bg-green-600 hover:bg-green-600 border-none text-white font-bold"
                    : selectedAnswer === answer
                    ? "bg-red-600 hover:bg-red-600 border-none text-white"
                    : "bg-gray-200"
                  : "hover:bg-gray-300"
              }`}
            >
              {answer.title}
              {isAnswered && selectedAnswer === answer && answer.correct && (
                <span>✔️</span>
              )}
              {isAnswered && selectedAnswer === answer && !answer.correct && (
                <span>❌</span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
