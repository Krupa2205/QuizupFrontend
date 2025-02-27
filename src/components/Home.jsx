import { useState } from "react";
import { Box, Typography } from "@mui/material";
import { motion } from "framer-motion";
import { keyframes } from "@emotion/react";
import { useUser } from "@clerk/clerk-react";
import Navbar from "./Navbar";
import QuizImageGrid from "./QuizImageGrid";

export default function HomePage() {
  const { isSignedIn } = useUser();

  // Floating Animated Circles
  const circles = [
    {
      x: [0, 50, -100, 0],
      y: [0, -100, 200, 0],
      duration: 14,
      size: 90,
      color: "#FF77B7",
    },
    {
      x: [30, -30, 30],
      y: [20, -20, 20],
      duration: 13,
      size: 95,
      color: "#FDB7EA",
    },
    {
      x: [-50, 50, -50],
      y: [50, -50, 50],
      duration: 12,
      size: 100,
      color: "#DA498D",
    },
  ];

  return (
    <>
      {/* Navbar */}
      <Navbar />

      {/* Animated Background */}
      <Box sx={{ position: "relative", overflow: "hidden", height: "50vh", bgcolor: "black" }}>
        {circles.map((circle, index) => (
          <motion.div
            key={index}
            animate={{ x: circle.x, y: circle.y }}
            transition={{ repeat: Infinity, duration: circle.duration, ease: "linear" }}
            style={{
              position: "absolute",
              top: `${Math.random() * 80}%`,
              left: `${Math.random() * 80}%`,
              width: circle.size,
              height: circle.size,
              background: circle.color,
              borderRadius: "50%",
              opacity: 0.6,
            }}
          />
        ))}

        {/* Welcome Section */}
        <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
          <Box sx={{ textAlign: "center", p: 5, color: "white", borderRadius: "10px", mt: 3 }}>
            <Typography variant="h3" fontWeight="bold">
             <h2> Welcome to QuizUp! 🎯</h2>
            </Typography>
            <Typography variant="h6" sx={{ mt: 1 }}>
              <h1>Solve quizzes, track your streak, and rank up!</h1>
            </Typography>
          </Box>
        </motion.div>
      </Box>

      {/* Quiz Image Grid Component */}
      <QuizImageGrid />
    </>
  );
}