import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@clerk/clerk-react";
import { Link } from "react-router-dom"; 
import { FaHome, FaRegLightbulb } from "react-icons/fa"; 
import "../styles/Review.css";
import ReactJs from "../assets/ReactjsImg.webp";
import NodeJS from "../assets/NodeJsImg.webp";
import Tailwind from "../assets/TailwindCssImg.webp";
import MongoDB from "../assets/MongoDBImg.webp";
import JS from "../assets/JSImg.webp";
import NextJS from "../assets/NextJsImg.webp";
import TypeScript from "../assets/TSImg.webp";
import CS1 from "../assets/CS1.webp";
import CS2 from "../assets/CS2.webp";
import CS3 from "../assets/CS3.webp";
import CS4 from "../assets/CS4.webp";

const Review = () => {
  const { user } = useAuth(); 
  const [quizProgress, setQuizProgress] = useState([]);
  const [selectedQuiz, setSelectedQuiz] = useState(null); 

  
  const quizzes = [
    { title: "ReactJS", image: ReactJs, correctAnswers: 10, wrongAnswers: 2 },
    { title: "NodeJS", image: NodeJS, correctAnswers: 8, wrongAnswers: 3 },
    { title: "Tailwind", image: Tailwind, correctAnswers: 7, wrongAnswers: 4 },
    { title: "MongoDB", image: MongoDB, correctAnswers: 9, wrongAnswers: 1 },
    { title: "JavaScript", image: JS, correctAnswers: 12, wrongAnswers: 5 },
    { title: "NextJS", image: NextJS, correctAnswers: 6, wrongAnswers: 3 },
    { title: "TypeScript", image: TypeScript, correctAnswers: 11, wrongAnswers: 2 },
    { title: "CS1", image: CS1, correctAnswers: 5, wrongAnswers: 5 },
    { title: "CS2", image: CS2, correctAnswers: 4, wrongAnswers: 6 },
    { title: "CS3", image: CS3, correctAnswers: 7, wrongAnswers: 3 },
    { title: "CS4", image: CS4, correctAnswers: 8, wrongAnswers: 2 },
  ];

  useEffect(() => {
    
    const fetchProgress = async () => {
      try {
        const response = await fetch(`/api/user-progress/${user.id}`);
        const data = await response.json();

       
        if (Array.isArray(data)) {
          setQuizProgress(data);
        } else {
          console.error("Invalid data format from API:", data);
        }
      } catch (error) {
        console.error("Error fetching quiz progress:", error);
      }
    };

    if (user) {
      fetchProgress();
    } else {
      
      setQuizProgress(quizzes);
    }
  }, [user]);

 
  const solvedQuizzes = quizProgress.filter(
    (quiz) => quiz.correctAnswers > 0 || quiz.wrongAnswers > 0
  );

  console.log("Quiz Progress:", quizProgress); 
  console.log("Solved Quizzes:", solvedQuizzes); 

  return (
    <div className="relative min-h-screen flex flex-col bg-black text-white p-14 items-center overflow-hidden">
      <Link
        to="/"
        className="absolute top-4 left-6 p-2 text-white font-bold flex items-center space-x-2"
      >
        <FaHome size={24} />
        <span>Home</span>
      </Link>

      <Link
        to="/quiz"
        className="absolute top-4 right-6 p-2 text-white font-bold flex items-center space-x-2"
      >
        <FaRegLightbulb size={24} />
        <span>Quiz</span>
      </Link>

      {/* Quiz Progress Section */}
      <div className="progress-section">
        <h2>QuizUp Progress</h2>
        <div className="progress-cards">
          {solvedQuizzes.length > 0 ? (
            solvedQuizzes.map((quiz, index) => (
              <motion.div
                key={index}
                className="progress-card"
                onClick={() => setSelectedQuiz(quiz)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={quiz.image} alt={quiz.title} className="quiz-image" />
                <h3>{quiz.title}</h3>
              </motion.div>
            ))
          ) : (
            <p>No quizzes solved yet. Start solving quizzes to see your progress!</p>
          )}
        </div>
      </div>

      {/* Pop-up Modal for Detailed Quiz Info */}
      <AnimatePresence>
        {selectedQuiz && (
          <motion.div
            className="popup-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedQuiz(null)}
          >
            <motion.div
              className="popup-card"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()} 
            >
              <img src={selectedQuiz.image} alt={selectedQuiz.title} className="popup-image" />
              <h2>{selectedQuiz.title}</h2>
              <p>✅ {selectedQuiz.correctAnswers} Correct</p>
              <p>❌ {selectedQuiz.wrongAnswers} Wrong</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Review;