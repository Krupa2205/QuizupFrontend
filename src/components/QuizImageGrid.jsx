import { Grid, Card, CardMedia } from "@mui/material";
import { motion } from "framer-motion";
import QuizImg1 from "../assets/QuizImg1.jpg";
import QuizImg2 from "../assets/QuizImg2.jpg";
import QuizImg3 from "../assets/QuizImg3.jpg";

const quizImages = [QuizImg1, QuizImg2, QuizImg3];

export default function QuizImageGrid() {
  return (
    <Grid
      container
      spacing={1}
      sx={{
        mt: 5,
        mb: 5, 
        px: 3,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
      }}
    >
      {quizImages.map((image, index) => (
        <Grid
          item
          xs={12}
          sm={6}
          md={4}
          key={index}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
          >
            <Card
              sx={{
                boxShadow: 4,
                borderRadius: 3,
                width: 280,
                height: 280,
                overflow: "hidden",
              }}
            >
              <CardMedia
                component="img"
                image={image}
                alt={`Feature ${index + 1}`}
                sx={{ width: "100%", height: "100%", objectFit: "cover" }}
              />
            </Card>
          </motion.div>
        </Grid>
      ))}
    </Grid>
  );
}
