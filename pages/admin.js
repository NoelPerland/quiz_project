import { useState, useContext } from "react";
import { QuizContext } from "@/context/QuizContext";
import Navbar from "./Navbar";

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
  return (
    <>
      <Navbar />
      <div className="container mx-auto p-4">
        <h2 className="text-3xl font-bold mb-4 text-center">Questions</h2>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-8">
          <div className="form-control mb-4">
            <label className="label">Title</label>
            <input
              type="text"
              name="title"
              value={questionForm.title}
              onChange={handleChange}
              className="input input-bordered"
              required
            />
          </div>

          <div className="form-control mb-4">
            <label className="label">Question</label>
            <textarea
              name="question"
              value={questionForm.question}
              onChange={handleChange}
              className="textarea textarea-bordered"
              required
            ></textarea>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            {questionForm.id ? "Update Question" : "Add Question"}
          </button>
        </form>

        <div className="overflow-x-auto mb-12">
          <table className="table w-full">
            <thead>
              <tr>
                <th>Title</th>
                <th>Question</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {questions.length === 0 ? (
                <tr>
                  <td colSpan="3" className="text-center">
                    No questions available.
                  </td>
                </tr>
              ) : (
                questions.map((question) => (
                  <tr key={question.id}>
                    <td>{question.title}</td>
                    <td>{question.question}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(question)}
                        className="btn btn-sm btn-info mr-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(question.id)}
                        className="btn btn-sm btn-error"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
