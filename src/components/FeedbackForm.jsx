import React, { useEffect, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom'; // For redirection
import Feedbackimg from '../assets/Feedback.webp';

function FeedbackForm() {
  const formspreeId = import.meta.env.VITE_FORMSPREE_ID; // Ensure this is just the form ID (e.g., xanqrleg)
  const [state, handleSubmit] = useForm(formspreeId); // Pass only the form ID
  const [showPopup, setShowPopup] = useState(false); // State to control pop-up visibility
  const navigate = useNavigate(); // Hook for navigation

  // Show pop-up and redirect after 5 seconds on successful submission
  useEffect(() => {
    if (state.succeeded) {
      setShowPopup(true); // Show the pop-up
      const timer = setTimeout(() => {
        navigate('/'); // Redirect to the home page after 5 seconds
      }, 5000);
      return () => clearTimeout(timer); // Cleanup the timer
    }
  }, [state.succeeded, navigate]);

  return (
    <div className="min-h-screen flex flex-col md:flex-row items-center justify-center bg-gray-100 dark:bg-gray-900 p-4 relative overflow-hidden">
      {/* Floating Animated Circles */}
      <motion.div
        className="absolute w-24 h-24 bg-pink-300 rounded-full opacity-30"
        style={{ top: '10%', left: '5%' }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
     
      <motion.div
        className="absolute w-20 h-20 bg-purple-300 rounded-full opacity-30"
        style={{ top: '50%', left: '20%' }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />
      <motion.div
        className="absolute w-24 h-24 bg-pink-300 rounded-full opacity-30"
        style={{ top: '10%', right: '5%' }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ repeat: Infinity, duration: 3 }}
      />
      <motion.div
        className="absolute w-20 h-20 bg-purple-300 rounded-full opacity-30"
        style={{ top: '70%', right: '20%' }}
        animate={{ scale: [1, 1.4, 1] }}
        transition={{ repeat: Infinity, duration: 5 }}
      />

      {/* Feedback Image - Visible on all screens */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="w-full md:w-1/3 lg:w-1/4 max-w-md mb-8 md:mb-0 md:mr-8"
      >
        <img
          src={Feedbackimg}
          alt="Feedback Illustration"
          className="rounded-lg shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-500"
        />
      </motion.div>

      {/* Feedback Form - Full width on small screens, adjusted width on larger screens */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full md:w-2/3 lg:w-1/2 max-w-md p-6 md:p-8 bg-white dark:bg-gray-800 rounded-lg shadow-2xl transform perspective-1000 rotate-y-3 hover:rotate-y-0 transition-transform duration-500"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-gray-100">
          Share Your Feedback✨💬
        </h2>

        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Email Address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter your email"
          />
          <ValidationError
            prefix="Email"
            field="email"
            errors={state.errors}
            className="text-red-500 text-sm dark:text-red-400"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Message
          </label>
          <textarea
            id="message"
            name="message"
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-gray-100"
            placeholder="Enter your feedback"
          />
          <ValidationError
            prefix="Message"
            field="message"
            errors={state.errors}
            className="text-red-500 text-sm dark:text-red-400"
          />
        </div>

        <button
          type="submit"
          disabled={state.submitting}
          className="w-full px-4 py-2 bg-pink-400 text-white font-semibold rounded-md hover:bg-pink-400 focus:outline-none focus:ring-2 focus:ring-pink-500 dark:bg-pink-400 dark:hover:bg-pink-500"
        >
          {state.submitting ? 'Submitting...' : 'Submit'}
        </button>
      </motion.form>

      {/* Pop-up Message */}
      {showPopup && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
        >
          <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-lg text-center max-w-xs">
            <p className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Dhanyavad😄
            </p>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">
              You will be redirected to the home page in 5 seconds...
            </p>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default FeedbackForm;