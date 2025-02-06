export default function Navbar() {
  return (
    <nav className="w-full bg-white shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0">
      <h2 className="text-2xl font-bold text-blue-600">Quix</h2>
      <div className="space-x-6">
        <a href="/" className="text-gray-700 hover:text-blue-600 transition">
          Home
        </a>
        <a
          href="/quiz"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          Quizzes
        </a>
        <a
          href="/about"
          className="text-gray-700 hover:text-blue-600 transition"
        >
          About
        </a>
      </div>
    </nav>
  );
}
