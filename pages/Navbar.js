import { RiAdminFill } from "react-icons/ri";

export default function Navbar() {
  return (
    <nav className="navbar  shadow-md fixed top-0 left-0 right-0 px-6">
      <div className="navbar-start">
        <h2 className="text-2xl font-bold">Quix</h2>
      </div>
      <div className="navbar-end space-x-6">
        <a href="/" className="btn btn-ghost">
          Home
        </a>
        <a href="/quiz" className="btn btn-ghost">
          Quizzes
        </a>
        <a href="/admin" className="btn btn-ghost flex items-center">
          <RiAdminFill className="w-6 h-6" />
        </a>
      </div>
    </nav>
  );
}
