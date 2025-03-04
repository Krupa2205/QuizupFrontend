import { ClerkProvider, SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/Home";
import SolveQuiz from "./components/SolveQuiz";
import Quiz from "./components/Quiz";
import About from "./components/About";
import QuickShowcase from "./components/QuickShowcase";
import Footer from "./components/Footer";
import Review from "./components/Review"; // Ensure this import is correct
import "./App.css";
import './index.css';

const clerkPublishableKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

function Layout() {
  const location = useLocation();
  const isQuizPage = location.pathname.startsWith("/quiz");
  const isReviewPage = location.pathname.startsWith("/review");

  return (
    <>
      {!isQuizPage && !isReviewPage && ( 
        <>
          <Home />
          <About />
          <QuickShowcase />
        </>
      )}

      <Routes>
        <Route path="/quiz" element={<SolveQuiz />} />
        <Route path="/quiz/:category" element={<Quiz />} />
        <Route path="/review" element={<Review />} /> {/* Ensure this is correct */}
      </Routes>

      {!isQuizPage && !isReviewPage && <Footer />} 
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