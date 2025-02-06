import { useState, useContext } from "react";
import { QuizContext } from "@/context/QuizContext";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { questions, addQuestion, updateQuestion, deleteQuestion } =
    useContext(QuizContext);

  const [answerInput, setAnswerInput] = useState("");
  const [questionForm, setQuestionForm] = useState({
    id: "",
    title: "",
    question: "",
    answers: [],
  });

  function handleLogin() {
    if (username === "admin" && password === "password") {
      setLoggedIn(true);
    } else {
      alert("Invalid login");
    }
  }

  function keyDown(e) {
    if (e.key === "Enter") {
      handleLogin();
    }
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setQuestionForm((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (questionForm.id) {
      updateQuestion(questionForm);
    } else {
      const newQuestion = { ...questionForm, id: Date.now().toString() };
      addQuestion(newQuestion);
    }

    setQuestionForm({
      id: "",
      title: "",
      question: "",
      answers: [],
    });
  }

  function handleEdit(question) {
    setQuestionForm(question);
  }

  function handleDelete(id) {
    deleteQuestion(id);
  }

  function addAnswerToQuestion() {
    const trimmedAnswer = answerInput.trim();
    if (trimmedAnswer !== "") {
      setQuestionForm({
        ...questionForm,
        answers: [
          ...questionForm.answers,
          { title: trimmedAnswer, correct: false },
        ],
      });
      setAnswerInput("");
    }
  }

  function removeAnswerFromQuestion(answerToRemove) {
    setQuestionForm({
      ...questionForm,
      answers: questionForm.answers.filter(
        (answer) => answer.title !== answerToRemove.title
      ),
    });
  }

  if (!loggedIn) {
    return (
      <div className="mx-auto max-w-sm p-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>
        <div className="form-control mb-4">
          <label className="label">Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input input-bordered"
            placeholder="Username"
          />
        </div>
        <div className="form-control mb-4">
          <label className="label">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input input-bordered"
            placeholder="Password"
            onKeyDown={keyDown}
          />
        </div>
        <button onClick={handleLogin} className="btn btn-primary w-full">
          Log In
        </button>
      </div>
    );
  }
}
