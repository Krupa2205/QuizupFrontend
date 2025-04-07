import { useState, useEffect } from "react";
import { useUser } from "@clerk/clerk-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { useParams, Link } from "react-router-dom";
import { FaHome, FaRegLightbulb } from "react-icons/fa";
import bronzeBadge from "@/assets/Bronze.webp";
import silverBadge from "@/assets/Silver.webp";
import goldBadge from "@/assets/Gold.webp";
import masterBadge from "@/assets/Master.webp";
import diamondBadge from "@/assets/Diamond.webp";
import blankBadge from "@/assets/Upcoming.webp";
import "../styles/Quiz.css";

const badges = [
  { limit: 30, image: bronzeBadge, name: "Bronze League" },
  { limit: 90, image: silverBadge, name: "Silver League" },
  { limit: 180, image: goldBadge, name: "Gold League" },
  { limit: 270, image: masterBadge, name: "Master League" },
  { limit: 360, image: diamondBadge, name: "Diamond League" },
];

export default function QuizUI() {
  const { user } = useUser();
  const { category } = useParams();
  const userId = user?.id || "guest";
  const storageKey = `quiz_progress_${userId}_${category}`;

  const [questionIndex, setQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [promotionMessage, setPromotionMessage] = useState(null);
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(true);
  const [showTimeUpPopup, setShowTimeUpPopup] = useState(false);
  const [answersDisabled, setAnswersDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!category) return;

    setLoading(true);
    // Using localhost URL temporarily - replace with your backend URL when ready
    fetch(`${import.meta.env.VITE_BACKEND_URL}/api/quiz/${category.toLowerCase()}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setQuestions(data);
        const savedProgress = localStorage.getItem(storageKey);
        if (savedProgress) {
          const parsedProgress = JSON.parse(savedProgress);
          setQuestionIndex(parsedProgress.questionIndex);
        }
      })
      .catch((err) => {
        console.error("Error fetching questions:", err);
        setQuestions([]); // Set empty array if API fails
      })
      .finally(() => setLoading(false));
  }, [category]);

  // Rest of your existing code remains exactly the same...
  // Timer effect
  useEffect(() => {
    let timer;
    if (timerActive && timeLeft > 0) {
      timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    } else if (timeLeft === 0 && timerActive) {
      handleTimeUp();
    }
    return () => clearTimeout(timer);
  }, [timeLeft, timerActive]);

  const handleTimeUp = () => {
    setTimerActive(false);
    setAnswersDisabled(true);
    setShowTimeUpPopup(true);
    
    setTimeout(() => {
      setShowTimeUpPopup(false);
      moveToNextQuestion();
    }, 2000);
  };

  const moveToNextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      handleAnswer(-1);
      const newIndex = questionIndex + 1;
      setQuestionIndex(newIndex);
      saveProgress(newIndex);
      setSelectedAnswer(null);
      setTimeLeft(60);
      setTimerActive(true);
      setAnswersDisabled(false);
    }
  };

  const saveProgress = (newIndex) => {
    const updatedProgress = { questionIndex: newIndex };
    localStorage.setItem(storageKey, JSON.stringify(updatedProgress));
  };

  const handleAnswer = async (selectedOptionIndex) => {
    if (answersDisabled) return;
    
    const isCorrect = selectedOptionIndex === questions[questionIndex]?.answer;
    setTimerActive(false);
    setAnswersDisabled(true);
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/progress/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: user?.id,
          category,
          isCorrect,
        }),
      });
  
      if (!response.ok) {
        throw new Error("Failed to update progress");
      }
  
      const data = await response.json();
      console.log("Progress updated:", data);
    } catch (error) {
      console.error("Error updating progress:", error);
    }
  };

  const nextQuestion = () => {
    if (questionIndex < questions.length - 1) {
      const newIndex = questionIndex + 1;
      setQuestionIndex(newIndex);
      saveProgress(newIndex);
      setSelectedAnswer(null);
      setTimeLeft(60);
      setTimerActive(true);
      setAnswersDisabled(false);
    }
  };

  const prevQuestion = () => {
    if (questionIndex > 0) {
      const newIndex = questionIndex - 1;
      setQuestionIndex(newIndex);
      saveProgress(newIndex);
      setSelectedAnswer(null);
      setTimeLeft(60);
      setTimerActive(true);
      setAnswersDisabled(false);
    }
  };

  // Get number of solved questions
  const solvedQuestions = questionIndex + 1;

  // Determine current badge
  const currentBadge = badges.reduce(
    (prev, badge) => (solvedQuestions >= badge.limit ? badge.image : prev),
    blankBadge
  );
  const currentBadgeName =
    badges.find((badge) => solvedQuestions >= badge.limit)?.name || "";

  // Check for promotion
  useEffect(() => {
    const lastBadge = localStorage.getItem(`${storageKey}_badge`);

    if (currentBadgeName && lastBadge !== currentBadgeName) {
      setPromotionMessage(
        `🎉 Congratulations! You've been promoted to ${currentBadgeName} 🏆`
      );
      localStorage.setItem(`${storageKey}_badge`, currentBadgeName);

      setTimeout(() => setPromotionMessage(null), 5000);
    }
  }, [currentBadgeName, storageKey]);

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white p-6 items-center overflow-hidden">
      <Link
        to="/"
        className="absolute top-6 left-6 p-2 text-white font-bold flex items-center space-x-2"
      >
        <FaHome size={24} />
        <span>Home</span>
      </Link>
      <Link
        to="/quiz"
        className="absolute top-6 right-6 p-2 text-white font-bold flex items-center space-x-2"
      >
        <FaRegLightbulb size={24} />
        <span>Quiz</span>
      </Link>
      <h2 className="text-xl font-bold mb-4">{user?.fullName || "Guest"}</h2>

      {/* Floating Animated Circles */}
      <motion.div
        className="circle pink-circle"
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <motion.div
        className="circle pink-circle2"
        animate={{ scale: [1, 1.5, 1] }}
        transition={{ repeat: Infinity, duration: 4 }}
      />

      {/* Progress Bar */}
      <div className="w-60 mb-4">
        <div className="relative w-full bg-gray-700 rounded-lg h-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-pink-400 to-pink-600"
            animate={{
              width: `${(solvedQuestions / (questions.length || 1)) * 100}%`,
            }}
            transition={{ duration: 0.5 }}
          />
        </div>
        <p className="text-xs text-gray-400 text-center mt-1">
  {Math.round((solvedQuestions / (questions.length || 1)) * 100)}% Completed
</p>
      </div>

      {/* Badge Display */}
      <div className="flex flex-col items-center my-4">
        <img
          src={currentBadge}
          alt="User badge"
          className="w-16 h-16 rounded-full border border-gray-500"
        />
        <p className="text-sm text-gray-300 mt-1">Badges</p>
      </div>

      {/* Timer Display */}
      <div className="mb-4 text-xl font-bold">
        Time Left: {timeLeft}s
      </div>

      {/* Time Up Popup */}
      <AnimatePresence>
        {showTimeUpPopup && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-50"
          >
            <div className="bg-red-500 text-white px-8 py-4 rounded-lg shadow-xl text-2xl font-bold">
              Time's Up!
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Promotion Message */}
      <AnimatePresence>
        {promotionMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="absolute top-1/4 left-1/2 transform -translate-x-1/2 bg-pink-400 text-white px-6 py-3 rounded-lg shadow-lg text-lg font-bold"
          >
            {promotionMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Quiz Card */}
      {loading ? (
        <p className="text-gray-400 mt-6">
          Loading questions...
        </p>
      ) : questions.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-transparent backdrop-blur-lg p-6 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-500/30"
        >
          <h3 className="text-lg font-bold mb-4">
            Q{solvedQuestions}.{" "}
            {questions[questionIndex]?.question || "No question available"}
          </h3>
          <div className="space-y-2">
            {questions[questionIndex]?.options?.map((option, index) => (
              <motion.button
                key={index}
                onClick={() => {
                  if (!answersDisabled) {
                    setSelectedAnswer(index);
                    handleAnswer(index);
                  }
                }}
                disabled={answersDisabled}
                className={`w-full p-3 rounded-lg transition-all font-bold text-black shadow-md border border-gray-600 ${
                  answersDisabled ? "opacity-70 cursor-not-allowed" : ""
                } ${
                  selectedAnswer === index
                    ? index === questions[questionIndex]?.answer
                      ? "bg-green-400"
                      : "bg-red-400"
                    : "bg-gray-800 hover:bg-gray-700 text-white"
                }`}
              >
                {option}
              </motion.button>
            ))}
          </div>
        </motion.div>
      ) : (
        <p className="text-gray-400 mt-6">
          No questions available for this category. Please try again later.
        </p>
      )}

      {/* Navigation Buttons */}
      <div className="flex justify-between w-full max-w-2xl mt-6">
        <Button
          onClick={prevQuestion}
          disabled={questionIndex === 0}
          className="bg-gradient-to-b from-pink-400 to-white text-black font-bold py-2 px-4 rounded-lg shadow-lg shadow-pink-300 active:translate-y-1 border border-pink-300"
          style={{ color: "black" }}
        >
          Previous
        </Button>
        <Button
          onClick={nextQuestion}
          disabled={questionIndex >= questions.length - 1 || questions.length === 0}
          className="bg-gradient-to-b from-pink-400 to-white text-black font-bold py-2 px-4 rounded-lg shadow-lg shadow-pink-300 active:translate-y-1 border border-pink-300"
          style={{ color: "black" }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}