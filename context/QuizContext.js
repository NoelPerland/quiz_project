import { startingQuestions } from "@/data/questions";
import { createContext, useState, useEffect } from "react";

export const QuizContext = createContext();

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
