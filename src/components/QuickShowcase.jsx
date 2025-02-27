import { motion } from "framer-motion";
import quizImage from "../assets/Logo2.jpg";
import "../styles/SolveQuiz.css";
import { Link } from "react-router-dom";

export default function QuizShowcase() {
  return (
    <div className="flex flex-col lg:flex-row items-center justify-center min-h-[60vh] bg-white p-6">
      {/* Left Side - Animated Image Card */}
      <motion.div
        className="w-full lg:w-1/2 flex justify-center"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <img
          src={quizImage}
          alt="Quiz"
          className="w-64 h-64 lg:w-80 lg:h-80 object-cover rounded-full shadow-lg"
        />
      </motion.div>

      {/* Right Side - Text Content */}
      <motion.div
        className="w-full lg:w-1/2 text-center lg:text-left mt-6 lg:mt-0 px-6"
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-3xl lg:text-4xl font-bold text-gray-900">
          Quick Access Your Quiz & Solve Today!
        </h1>
        <p className="text-lg text-gray-600 max-w-xl mt-4">
          <h2>Enhance your knowledge with daily quizzes. Challenge yourself and grow
          smarter every day!</h2>
        </p>

        {/* Gradient Animated Button */}
        <Link
  to="/quiz"
  className="inline-block mt-6 mr-4 px-6 py-3 text-lg font-semibold text-black bg-gradient-to-r from-pink-500 via-white to-black rounded-xl shadow-lg transition-transform transform hover:scale-105"
>
  Start Quiz 💻
</Link>

<Link
  to="/review"
  className="inline-block mt-6 px-6 py-3 text-lg font-semibold text-black bg-gradient-to-r from-pink-500 via-white to-black rounded-xl shadow-lg transition-transform transform hover:scale-105"
>
  Your Quiz Review ✨
</Link>
      </motion.div>
    </div>
  );
}
