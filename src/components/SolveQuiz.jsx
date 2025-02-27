import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import QuizCard from "./QuizCard";
import "../styles/SolveQuiz.css";
import ReactJs from "../assets/ReactjsImg.webp";
import NodeJS from "../assets/NextJsImg.webp";
import Tailwind from "../assets/TailwindCssImg.webp";
import MongoDB from "../assets/MongoDBImg.webp";
import JS from "../assets/JSImg.webp";
import NextJS from "../assets/NextJsImg.webp";
import TypeScript from "../assets/TSImg.webp";
import CS1 from "../assets/CS1.webp";
import CS2 from "../assets/CS2.webp";
import CS3 from "../assets/CS3.webp";
import CS4 from "../assets/CS4.webp";
import { FaHome } from "react-icons/fa";
import {useUser}  from "@clerk/clerk-react"

function SolveQuiz() {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const { user } = useUser(); 


  // Quiz categories
  const quizzes = [
    { title: "ReactJS", image: ReactJs },
    { title: "NodeJS", image: NodeJS },
    { title: "Tailwind", image: Tailwind },
    { title: "MongoDB", image: MongoDB },
    { title: "JavaScript", image: JS },
    { title: "NextJS", image: NextJS },
    { title: "TypeScript", image: TypeScript },
    { title: "CS1", image: CS1 },
    { title: "CS2", image: CS2 },
    { title: "CS3", image: CS3 },
    { title: "CS4", image: CS4 },
  ];

  // Auto-scroll function for infinite scrolling
  useEffect(() => {
    const interval = setInterval(() => {
      scrollRef.current.scrollBy({ left: 250, behavior: "smooth" });
      if (
        scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
        scrollRef.current.scrollWidth
      ) {
        scrollRef.current.scrollTo({ left: 0, behavior: "smooth" });
      }
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="solve-quiz-container">
      {/* ✅ Top Header with Home Icon & Dynamic Username */}
      <div className="top-header">
        <FaHome className="home-icon" onClick={() => navigate("/")} />
        {user ? (
          <span className="username">{user.fullName || user.firstName}</span> 
        ) : (
          <span className="username">Loading...</span> 
        )}
      </div>

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

      {/* Scrollable Card Section */}
      <div className="scroll-container">
        <button className="scroll-btn left" onClick={() => scrollRef.current.scrollBy({ left: -250, behavior: "smooth" })}>
          ❮
        </button>
        <div className="card-wrapper" ref={scrollRef}>
          {quizzes.map((quiz, index) => (
            <QuizCard 
              key={index} 
              title={quiz.title} 
              image={quiz.image} 
              onClick={() => navigate(`/quiz/${quiz.title}`)}
            />
          ))}
        </div>
        <button className="scroll-btn right" onClick={() => scrollRef.current.scrollBy({ left: 250, behavior: "smooth" })}>
          ❯
        </button>
      </div>
    </div>
  );
}

export default SolveQuiz;
