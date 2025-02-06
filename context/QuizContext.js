import { createContext, useState, useEffect } from "react";

export const QuizContext = createContext();

const startingQuestions = [
  {
    id: "1",
    title: "Fråga 1",
    question: "Vilket är världens största djur?",
    answers: [
      { title: "Elefant", correct: false },
      { title: "Blåval", correct: true },
      { title: "Giraff", correct: false },
    ],
  },
  {
    id: "2",
    title: "Fråga 2",
    question: "Vilket land har flest invånare?",
    answers: [
      { title: "USA", correct: false },
      { title: "Kina", correct: true },
      { title: "Indien", correct: false },
    ],
  },
  {
    id: "3",
    title: "Fråga 3",
    question: "Vilket grundämne har kemiska beteckningen 'O'?",
    answers: [
      { title: "Syre", correct: true },
      { title: "Guld", correct: false },
      { title: "Väte", correct: false },
    ],
  },
  {
    id: "4",
    title: "Fråga 4",
    question: "Vilken planet är närmast solen?",
    answers: [
      { title: "Mars", correct: false },
      { title: "Jorden", correct: false },
      { title: "Merkurius", correct: true },
    ],
  },
  {
    id: "5",
    title: "Fråga 5",
    question: "Vad heter huvudstaden i Brasilien?",
    answers: [
      { title: "Rio de Janeiro", correct: false },
      { title: "São Paulo", correct: false },
      { title: "Brasília", correct: true },
    ],
  },
];

export default function QuizProvider({ children }) {
  const [questions, setQuestions] = useState(startingQuestions);

  useEffect(() => {
    const storedQuestions = localStorage.getItem("questions");
    if (storedQuestions && JSON.parse(storedQuestions).length > 0) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("questions", JSON.stringify(questions));
  }, [questions]);

  function addQuestion(question) {
    setQuestions([...questions, question]);
  }

  function updateQuestion(updatedQuestion) {
    setQuestions(
      questions.map((question) =>
        question.id === updatedQuestion.id ? updatedQuestion : question
      )
    );
  }

  function deleteQuestion(id) {
    setQuestions(questions.filter((question) => question.id !== id));
  }

  return (
    <QuizContext.Provider
      value={{
        questions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}
