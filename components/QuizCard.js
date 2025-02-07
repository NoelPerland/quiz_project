import { useState } from "react";

export default function QuizCard({ question, onAnswerSelected }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);

  function handleAnswerClick(answer) {
    if (!isAnswered) {
      setSelectedAnswer(answer);
      setIsAnswered(true);
      // Notify the parent that an answer was selected.
      if (onAnswerSelected) {
        onAnswerSelected(answer);
      }
    }
  }

  return (
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body text-center">
        <h3 className="card-title text-xl font-semibold">
          {question.question}
        </h3>
        <div className="mt-4 space-y-2">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              className={`btn w-full p-2 transition ${
                isAnswered
                  ? selectedAnswer === answer
                    ? answer.correct
                      ? "bg-green-500 hover:bg-green-500 text-white font-bold"
                      : "bg-red-500 hover:bg-red-500 text-white"
                    : "bg-gray-200"
                  : "hover:bg-gray-300"
              }`}
            >
              {answer.title}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
