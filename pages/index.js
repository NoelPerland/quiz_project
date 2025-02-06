import Link from "next/link";
import Navbar from "./Navbar"; // Import Navbar

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <Navbar /> {/* Use Navbar here */}
      {/* Hero Section */}
      <section className="text-center max-w-3xl mt-20">
        <h1 className="text-4xl font-bold  sm:text-5xl">
          Test Your Knowledge with <span>Quix</span>
        </h1>
        <p className="mt-4 text-lg ">
          Challenge yourself with fun and interactive quizzes. Learn, compete,
          and improve your skills.
        </p>
        <Link href="/quiz">
          <button className="btn btn-primary mt-6 px-6 py-3  font-semibold rounded-lg shadow-md  transition">
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
    <div className="card bg-base-300 shadow-xl">
      <div className="card-body text-center">
        <h3 className="card-title text-xl font-semibold">{title}</h3>
        <p className="mt-2">{desc}</p>
      </div>
    </div>
  );
}
