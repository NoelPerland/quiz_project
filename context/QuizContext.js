import { createContext, useState, useEffect } from "react";

export const QuizContext = createContext();

const startingQuestions = [
  {
    id: "0",
    title: "Question 1",
    question: "Which language is primarily used for web development?",
    answers: [
      { title: "Python", correct: false },
      { title: "JavaScript", correct: true },
      { title: "C++", correct: false },
    ],
  },
  {
    id: "1",
    title: "Question 2",
    question: "What does HTML stand for?",
    answers: [
      { title: "HyperText Markup Language", correct: true },
      { title: "Hyperlink and Text Management Language", correct: false },
      { title: "High-Level Text Management Language", correct: false },
    ],
  },
  {
    id: "2",
    title: "Question 3",
    question: "Which of the following is a version control system?",
    answers: [
      { title: "Git", correct: true },
      { title: "Docker", correct: false },
      { title: "Nginx", correct: false },
    ],
  },
  {
    id: "3",
    title: "Question 4",
    question:
      "Which JavaScript **library** is developed by Meta (formerly Facebook)?",
    answers: [
      { title: "Angular", correct: false },
      { title: "Vue", correct: false },
      { title: "React", correct: true },
    ],
  },
  {
    id: "4",
    title: "Question 5",
    question: "What is the primary purpose of CSS?",
    answers: [
      { title: "To define the structure of a webpage", correct: false },
      { title: "To style and layout web pages", correct: true },
      { title: "To handle server-side logic", correct: false },
    ],
  },
  {
    id: "5",
    title: "Question 6",
    question:
      "Which keyword(s) can be used to declare a variable in JavaScript?",
    answers: [
      { title: "var, let, or const", correct: true },
      { title: "define", correct: false },
      { title: "declare", correct: false },
    ],
  },
  {
    id: "6",
    title: "Question 7",
    question:
      "Which of the following is a relational database management system (RDBMS)?",
    answers: [
      { title: "MongoDB", correct: false },
      { title: "MySQL", correct: true },
      { title: "Redis", correct: false },
    ],
  },
  {
    id: "7",
    title: "Question 8",
    question: "What does the acronym API stand for?",
    answers: [
      { title: "Automated Program Integration", correct: false },
      { title: "Application Programming Interface", correct: true },
      { title: "Advanced Processing Instruction", correct: false },
    ],
  },
  {
    id: "8",
    title: "Question 9",
    question:
      "Which of the following is **not** a recognized programming paradigm?",
    answers: [
      { title: "Functional Programming", correct: false },
      { title: "Object-Oriented Programming", correct: false },
      { title: "Blockchain Programming", correct: true },
    ],
  },
  {
    id: "9",
    title: "Question 10",
    question: "What is the primary purpose of Node.js?",
    answers: [
      { title: "To run JavaScript on the server-side", correct: true },
      { title: "To style web pages", correct: false },
      { title: "To manage databases", correct: false },
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
