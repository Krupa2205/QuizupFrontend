import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import SolveQuiz from "./components/SolveQuiz";
import Quiz from "./components/Quiz";
import About from "./components/About";
import QuickShowcase from "./components/QuickShowcase";
import Footer from "./components/Footer";
import Review from "./components/Review";
import FeedbackForm from "./components/FeedbackForm"; // Make sure the import path is correct
import "./App.css";
import './index.css';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function Layout() {
  const location = useLocation();
  const isQuizPage = location.pathname.startsWith("/quiz");
  const isReviewPage = location.pathname.startsWith("/review");
  const isFeedbackPage = location.pathname.startsWith("/feedback"); // Corrected variable name

  return (
    <>
      {!isQuizPage && !isReviewPage && !isFeedbackPage && ( // Fixed syntax here
        <>
          <Home />
          <About />
          <QuickShowcase />
        </>
      )}

      <Routes>
        <Route path="/quiz" element={<SolveQuiz />} />
        <Route path="/quiz/:category" element={<Quiz />} />
        <Route path="/review" element={<Review />} />
        <Route path="/feedback" element={<FeedbackForm />} /> {/* Feedback route */}
      </Routes>

      {!isQuizPage && !isReviewPage && !isFeedbackPage && <Footer />} {/* Hide footer on feedback page */}
    </>
  );
}

function App() {
  return (
    <ClerkProvider publishableKey={clerkPublishableKey}>
      <BrowserRouter>
        <SignedIn>
          <Layout />
        </SignedIn>
        <SignedOut>
          <RedirectToSignIn />
        </SignedOut>
      </BrowserRouter>
    </ClerkProvider>
  );
}

export default App;