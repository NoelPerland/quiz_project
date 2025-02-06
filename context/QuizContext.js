import { createContext, useState, useEffect } from "react";

export const QuestionsContext = createContext();

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

export default function PortfolioProvider({ children }) {
  const [questions, setQuestions] = useState(startingQuestions);

  useEffect(() => {
    const storedProjects = localStorage.getItem("projects");
    if (storedProjects && JSON.parse(storedProjects).length > 0) {
      setProjects(JSON.parse(storedProjects));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("projects", JSON.stringify(projects));
  }, [projects]);

  function addProject(project) {
    setProjects([...projects, project]);
  }

  function updateProject(updatedProject) {
    setProjects(
      projects.map((project) =>
        project.id === updatedProject.id ? updatedProject : project
      )
    );
  }

  function deleteProject(id) {
    setProjects(projects.filter((project) => project.id !== id));
  }

  return (
    <PortfolioContext.Provider
      value={{
        projects,
        addProject,
        updateProject,
        deleteProject,
        techSkills,
        addTechSkill,
        deleteTechSkill,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
