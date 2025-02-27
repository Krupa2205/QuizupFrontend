import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/SolveQuiz.css";

const QuizCard = ({ title, image }) => {
  const navigate = useNavigate();

  return (
    <div className="card">
      <img src={image} alt={title} />
      <button
        className="quiz-btn"
        onClick={() => navigate(`/quiz/${title.toLowerCase().replace(/\s+/g, "-")}`)}
      >
        {title}
      </button>
    </div>
  );
};

export default QuizCard;
