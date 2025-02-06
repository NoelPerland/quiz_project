import Link from "next/link";
import Navbar from "./Navbar"; // Import Navbar

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center px-6">
      <Navbar /> {/* Use Navbar here */}
      {/* Hero Section */}
      <section className="text-center max-w-3xl mt-20">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          Test Your Knowledge with <span className="text-blue-600">Quix</span>
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Challenge yourself with fun and interactive quizzes. Learn, compete,
          and improve your skills.
        </p>
        <Link href="/quiz">
          <button className="mt-6 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition">
            Start Quiz
          </button>
        </Link>
      </section>
      {/* Features Section */}
      <section className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <FeatureCard
          title="Engaging Questions"
          desc="Enjoy a variety of quiz topics to test your knowledge."
        />
        <FeatureCard
          title="Instant Feedback"
          desc="Get immediate results and learn from your mistakes."
        />
        <FeatureCard
          title="Compete with Friends"
          desc="Challenge your friends and see who scores the highest!"
        />
      </section>
    </div>
  );
}

function FeatureCard({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md text-center">
      <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
      <p className="mt-2 text-gray-600">{desc}</p>
    </div>
  );
}
