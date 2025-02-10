import { useState, useContext } from "react";
import { QuizContext } from "@/context/QuizContext";
import Navbar from "./Navbar";

export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [questionToDelete, setQuestionToDelete] = useState(null);

  const { questions, addQuestion, updateQuestion, deleteQuestion } =
    useContext(QuizContext);

  const [questionForm, setQuestionForm] = useState({
    id: "",
    title: "",
    question: "",
    answers: [
      { title: "", correct: false },
      { title: "", correct: false },
      { title: "", correct: false },
    ],
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

  function handleAnswerChange(index, value) {
    setQuestionForm((prev) => {
      const newAnswers = [...prev.answers];
      newAnswers[index].title = value;
      return { ...prev, answers: newAnswers };
    });
  }

  function handleCorrectAnswer(index) {
    setQuestionForm((prev) => {
      const newAnswers = prev.answers.map((answer, i) => ({
        ...answer,
        correct: i === index,
      }));
      return { ...prev, answers: newAnswers };
    });
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
      answers: [
        { title: "", correct: false },
        { title: "", correct: false },
        { title: "", correct: false },
      ],
    });
  }

  function handleEdit(question) {
    setQuestionForm(question);
  }
  function confirmDelete(id) {
    setQuestionToDelete(id);
  }

  function handleConfirmDelete() {
    if (questionToDelete) {
      deleteQuestion(questionToDelete);
      setQuestionToDelete(null);
    }
  }

  if (!loggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-green-200 via-base-200 to-green-200 text-base-content">
        <div className="mx-auto max-w-sm p-4 py-28  ">
          <h2 className="text-2xl font-bold mb-4 text-center">Admin Login</h2>

          <div className="form-control mb-4">
            <label className="label text-gray-600 font-medium">Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="input input-bordered focus:ring focus:ring-accent focus:outline-none transition duration-200"
              placeholder="Username"
            />
          </div>

          <div className="form-control mb-4 ">
            <label className="label text-gray-600 font-medium">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input input-bordered focus:ring focus:ring-accent
               focus:outline-none transition duration-200"
              placeholder="Password"
              onKeyDown={keyDown}
            />
          </div>

          <button
            onClick={handleLogin}
            className="btn btn-accent w-full hover:scale-105 active:scale-95 transition duration-200"
          >
            Log In
          </button>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div
        id="container"
        className="bg-gradient-to-b from-green-200 via-base-200 to-green-200"
      >
        <h2 className="text-3xl font-bold mb-4 text-center">Questions</h2>

        <form onSubmit={handleSubmit} className="max-w-xl mx-auto mb-8 px-5">
          <div className="form-control mt-12 mb-6">
            <label className="label ">Title</label>
            <input
              type="text"
              name="title"
              value={questionForm.title}
              onChange={handleChange}
              className="input input-bordered focus:ring focus:ring-accent focus:outline-none transition duration-200"
              required
            />
          </div>

          <div className="form-control mb-4 ">
            <label className="label">Question</label>
            <textarea
              name="question"
              value={questionForm.question}
              onChange={handleChange}
              className="textarea textarea-bordered  focus:ring focus:ring-accent focus:outline-none transition duration-200"
              required
            ></textarea>
          </div>

          <div className="form-control mb-4">
            <label className="label">Answers</label>
            {questionForm.answers.map((answer, index) => (
              <div key={index} className="flex gap-2 items-center mb-2">
                <input
                  type="text"
                  value={answer.title}
                  onChange={(e) => handleAnswerChange(index, e.target.value)}
                  className="input input-bordered flex-1 focus:ring focus:ring-accent focus:outline-none transition duration-200"
                  placeholder={`Answer ${index + 1}`}
                  required
                />
                <input
                  type="radio"
                  name="correctAnswer"
                  checked={answer.correct}
                  onChange={() => handleCorrectAnswer(index)}
                  className="radio"
                />
                <span>Correct</span>
              </div>
            ))}
          </div>

          <button
            type="submit"
            className="btn btn-accent
           w-full"
          >
            {questionForm.id ? "Update Question" : "Add Question"}
          </button>
        </form>

        <div className="container mx-auto pb-4">
          <div className="overflow-x-auto mb-12">
            <table className="table w-full">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Question</th>
                  <th>Answers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {questions.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center">
                      No questions available.
                    </td>
                  </tr>
                ) : (
                  questions.map((question) => (
                    <tr key={question.id}>
                      <td>{question.title}</td>
                      <td>{question.question}</td>
                      <td>
                        {question.answers.map((answer, i) => (
                          <div
                            key={i}
                            className={answer.correct ? "text-green-500" : ""}
                          >
                            {answer.title} {answer.correct ? "(Correct)" : ""}
                          </div>
                        ))}
                      </td>
                      <td>
                        <a href="#container">
                          <button
                            onClick={() => handleEdit(question)}
                            className="btn btn-sm btn-info mr-2"
                          >
                            Edit
                          </button>
                        </a>
                        <button
                          onClick={() => confirmDelete(question.id)}
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
      </div>
      {questionToDelete && (
        <dialog id="deleteModal" className="modal modal-open">
          <div className="modal-box">
            <h3 className="text-lg font-semibold">Are you sure?</h3>
            <p className="py-4">Do you really want to delete this question?</p>
            <div className="modal-action">
              <button
                onClick={() => setQuestionToDelete(null)}
                className="btn btn-accent"
              >
                Cancel
              </button>
              <button onClick={handleConfirmDelete} className="btn btn-error ">
                Yes, Delete
              </button>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
