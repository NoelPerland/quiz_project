import { RiAdminFill } from "react-icons/ri";

export default function Navbar() {

  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0">
      <h2><a href="/" className="text-2xl font-bold text-blue-600">Quix</a></h2>

      <div className="flex items-center space-x-6">
        <a href="/" className="text-gray-700 hover:text-blue-600 transition">
          Home
        </a>
        <a href="/quiz" className="text-gray-700 hover:text-blue-600 transition">
          Quizzes
        </a>
        <a href="./admin" className="text-gray-700 hover:text-blue-600 transition flex items-center">
          <RiAdminFill className="w-6 h-6" />
        </a>

      </div>
    </nav>
  );
}
