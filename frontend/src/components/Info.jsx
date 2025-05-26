import { motion, AnimatePresence } from "framer-motion";
import {
  FaFireAlt,
  FaRobot,
  FaUserCheck,
  FaChartLine,
  FaBrain,
  FaQuestionCircle,
  FaChevronDown,
} from "react-icons/fa";
import AppBackground from "./AppBackground";
import Footer from "./Footer";
import { useState } from "react";

const steps = [
  {
    icon: <FaUserCheck className="text-blue-400 text-3xl" />,
    title: "Enter Your Details",
    desc: "Fill in your age, gender, height, weight, workout duration, heart rate, and body temperature.",
  },
  {
    icon: <FaFireAlt className="text-pink-400 text-3xl" />,
    title: "AI-Powered Prediction",
    desc: "Our advanced AI model analyzes your data and predicts calories burnt instantly.",
  },
  {
    icon: <FaChartLine className="text-yellow-400 text-3xl" />,
    title: "Get Instant Results",
    desc: "See your estimated calorie burn and use the insights to optimize your fitness journey!",
  },
];

const faqs = [
  {
    q: "How accurate is the prediction?",
    a: "Our model is trained on real-world exercise data and validated for accuracy, but individual results may vary based on unique physiology.",
  },
  {
    q: "Is my data stored?",
    a: "No. Your data is used only for the prediction and is never stored or shared.",
  },
  {
    q: "What types of workouts does this support?",
    a: "The model is optimized for general cardio and aerobic activities, but can give a good estimate for most moderate-intensity exercises.",
  },
  {
    q: "How is the prediction calculated?",
    a: "We use a machine learning model trained on thousands of workout records, considering your personal metrics and exercise details.",
  },
];

function Info() {
  const [openIdx, setOpenIdx] = useState(null);
  return (
    <div className="min-h-screen w-full flex flex-col justify-between pt-28 pb-8 relative">
      <AppBackground />
      <main className="relative z-10 flex flex-col items-center w-full px-4">
        {/* Hero Section */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text mb-4 drop-shadow-lg">
            About CalorieAI
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            Learn how our AI-powered app predicts your calorie burn and helps
            you reach your fitness goals.
          </p>
        </motion.div>
        {/* How It Works */}
        <motion.div
          className="w-full max-w-4xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-blue-500 mb-8 text-center flex items-center justify-center gap-2">
            <FaRobot className="inline text-2xl mb-1" /> How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, idx) => (
              <motion.div
                key={step.title}
                className="bg-white/20 dark:bg-slate-900/60 backdrop-blur-xl border border-white/30 dark:border-slate-800/40 rounded-2xl shadow-xl p-7 flex flex-col items-center text-center"
                initial={{ opacity: 0, y: 40, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{
                  type: "spring",
                  stiffness: 90,
                  damping: 14,
                  delay: idx * 0.1,
                }}
              >
                <div className="mb-3 animate-bounce-slow">{step.icon}</div>
                <h3 className="text-lg font-bold text-blue-700 dark:text-yellow-300 mb-2 drop-shadow-sm">
                  {step.title}
                </h3>
                <p className="text-base text-gray-700 dark:text-gray-200">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
        {/* Science Section */}
        <motion.div
          className="w-full max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-center gap-8 bg-white/20 dark:bg-slate-900/60 backdrop-blur-xl border border-white/30 dark:border-slate-800/40 rounded-2xl shadow-xl p-8">
            <FaBrain className="text-5xl text-indigo-400 mb-4 md:mb-0" />
            <div>
              <h3 className="text-xl font-bold text-indigo-500 mb-2">
                The Science & AI Behind the Prediction
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-200">
                CalorieAI uses a machine learning model trained on thousands of
                real workout records. It considers your personal metrics and
                exercise details to estimate calories burnt, providing fast,
                science-backed results tailored to you.
              </p>
            </div>
          </div>
        </motion.div>
        {/* FAQ Section */}
        <motion.div
          className="w-full max-w-3xl mx-auto mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-pink-400 mb-6 flex items-center gap-2">
            <FaQuestionCircle className="inline text-2xl mb-1" /> FAQ
          </h2>
          <div className="space-y-4">
            {faqs.map((faq, idx) => (
              <motion.div
                key={faq.q}
                className="bg-white/30 dark:bg-slate-900/60 border border-white/30 dark:border-slate-800/40 rounded-xl shadow p-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.08, duration: 0.5 }}
              >
                <button
                  className="flex items-center justify-between w-full text-left text-lg font-semibold text-blue-600 dark:text-yellow-300 focus:outline-none"
                  onClick={() => setOpenIdx(openIdx === idx ? null : idx)}
                >
                  {faq.q}
                  <FaChevronDown
                    className={`ml-2 transition-transform ${
                      openIdx === idx ? "rotate-180" : "rotate-0"
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openIdx === idx && (
                    <motion.div
                      className="mt-2 text-base text-gray-700 dark:text-gray-200"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {faq.a}
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default Info;
