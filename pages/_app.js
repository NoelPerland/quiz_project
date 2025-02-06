import "@/styles/globals.css";
import Navbar from "./Navbar";
import QuizProvider from "@/context/QuizContext";

export default function App({ Component, pageProps }) {
  return (
    <div>
      <QuizProvider>
        <Navbar />
        <Component {...pageProps} />
      </QuizProvider>
    </div>
  );
}
