import { RiAdminFill } from "react-icons/ri";

export default function Navbar() {
  return (
    <nav className="w-full bg-base-100 shadow-md py-4 px-6 flex justify-between items-center fixed top-0 left-0 right-0 z-50">
      <h2>
        <a href="/" className="text-2xl text-accent font-bold">
          Quix
        </a>
      </h2>

      <div className="flex items-center space-x-6">
        <a
          href="/"
          className="text-gray-700 font-bold hover:text-green-800  hover:bold transition"
        >
          Home
        </a>
        <a
          href="./admin"
          className="text-gray-700   hover:text-green-800 
          00 transition flex items-center"
        >
          <RiAdminFill className="w-6 h-6" />
        </a>
      </div>
    </nav>
  );
}
