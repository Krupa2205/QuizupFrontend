import React from "react";
import { Box, Typography, Container, Grid, Button } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import AboutUs from "../assets/AboutUs.webp";

const About = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/solve-quiz");
  };

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "80vh",
        bgcolor: "black",
        color: "white",
        display: "flex",
        alignItems: "center",
        paddingTop: { xs: 8, md: 12 },
        paddingBottom: 4,
      }}
    >
      {/* Background Animations */}
      {[
        { top: "10%", left: "15%" },
        { top: "50%", left: "30%" },
        { top: "30%", left: "70%" },
        { top: "80%", left: "50%" }
      ].map((pos, index) => (
        <motion.div
          key={index}
          animate={{ x: [0, 100, -100, 0], y: [0, -50, 50, 0] }}
          transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
          style={{
            position: "absolute",
            top: pos.top,
            left: pos.left,
            width: 100,
            height: 100,
            background: "linear-gradient(45deg, #FFCCE1, #FF77B7)",
            borderRadius: "50%",
            opacity: 0.6,
          }}
        />
      ))}

      <Container sx={{ mt: { xs: 6, md: 0 } }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <motion.img
              src={AboutUs}
              alt="About Us"
              style={{
                width: "clamp(300px, 90%, 400px)",
                maxWidth: "400px",
                minWidth: "300px",
                height: "auto",
                borderRadius: "20px",
                display: "block",
                margin: "0 auto",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={6}>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1 }}
            >
              <Typography
                variant="h3"
                sx={{
                  fontWeight: "bold",
                  textTransform: "uppercase",
                  letterSpacing: 2,
                  color: "#FF77B7",
                }}
              >
                <h2>About Us✨</h2>
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: 2,
                  lineHeight: 1.6,
                  fontSize: "1.1rem",
                  color: "white",
                  maxWidth: "500px",
                }}
              >
                <h1> 👩🏻‍💻Learn, Compete & Win!
                🚀 Unlock your coding potential! Solve quizzes on ReactJS, TailwindCSS, JavaScript, TypeScript, NodeJS, MongoDB, and more. Earn Bronze, Silver, Gold, Diamond, and Master Badges as you level up your skills!</h1> <br></br> <br></br> 

                <h1>🎯 Challenge Your Knowledge, Earn Rewards! 
                🔥 Test your expertise in modern web technologies!  Compete with others and collect prestigious badges as you climb the leaderboard. Are you ready to become a Master Coder?</h1> <br></br> <br></br> 

                <h1>🔢 Where Learning Meets Gamification! 
                🎯 Sharpen your skills with interactive quizzes!Win exciting badges and prove your expertise in ReactJS, JavaScript, TypeScript, and more. Start your journey today!</h1> <br></br> <br></br>

                <h1>🏅🥇🏆💎 Gamify Your Coding Skills! 
                💡 Take quizzes on ReactJS, JavaScript, TailwindCSS, and more!Earn exclusive Bronze to Master Badges and elevate your learning with a fun and competitive experience!</h1>
              </Typography>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default About;
