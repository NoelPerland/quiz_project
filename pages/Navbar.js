import { RiAdminFill } from "react-icons/ri";

export default function Navbar() {
  return (
    <nav className="navbar bg-gray-900 text-white shadow-md fixed top-0 left-0 right-0 px-6">
      <div className="navbar-start">
        <h2 className="text-2xl font-bold">Quix</h2>
      </div>
      <div className="navbar-end space-x-6">
        <a href="/" className="btn btn-ghost text-white hover:bg-gray-700">
          Home
        </a>
        <a href="/quiz" className="btn btn-ghost text-white hover:bg-gray-700">
          Quizzes
        </a>
        <a
          href="/admin"
          className="btn btn-ghost flex items-center text-white hover:bg-gray-700"
        >
          <RiAdminFill className="w-6 h-6" />
        </a>
      </div>
    </nav>
  );
}
