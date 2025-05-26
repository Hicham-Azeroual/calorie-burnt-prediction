import { motion } from "framer-motion";
import {
  FaHeartbeat,
  FaAppleAlt,
  FaDumbbell,
  FaBed,
  FaSmile,
  FaTint,
  FaRunning,
  FaLeaf,
  FaBrain,
  FaFireAlt,
} from "react-icons/fa";
import AppBackground from "./AppBackground";
import Footer from "./Footer";

const adviceList = [
  {
    icon: <FaHeartbeat className="text-pink-400 text-3xl" />,
    title: "Stay Active",
    desc: "Aim for at least 30 minutes of moderate exercise most days. Consistency is key!",
  },
  {
    icon: <FaAppleAlt className="text-green-400 text-3xl" />,
    title: "Eat Nutritious Foods",
    desc: "Fill your plate with colorful fruits, veggies, lean proteins, and whole grains.",
  },
  {
    icon: <FaDumbbell className="text-blue-400 text-3xl" />,
    title: "Strength Train",
    desc: "Incorporate resistance training 2-3 times a week to build muscle and boost metabolism.",
  },
  {
    icon: <FaBed className="text-purple-400 text-3xl" />,
    title: "Prioritize Sleep",
    desc: "Aim for 7-9 hours of quality sleep each night to support recovery and well-being.",
  },
  {
    icon: <FaSmile className="text-yellow-400 text-3xl" />,
    title: "Manage Stress",
    desc: "Practice mindfulness, deep breathing, or yoga to keep stress in check.",
  },
  {
    icon: <FaTint className="text-blue-300 text-3xl" />,
    title: "Stay Hydrated",
    desc: "Drink plenty of water throughout the day to keep your body functioning optimally.",
  },
  {
    icon: <FaRunning className="text-pink-300 text-3xl" />,
    title: "Mix Cardio & Fun",
    desc: "Try different activities—dancing, hiking, cycling—to keep workouts enjoyable.",
  },
  {
    icon: <FaLeaf className="text-green-500 text-3xl" />,
    title: "Go Outdoors",
    desc: "Spend time in nature for a mood and energy boost.",
  },
  {
    icon: <FaBrain className="text-indigo-400 text-3xl" />,
    title: "Train Your Mind",
    desc: "Mental fitness matters! Read, meditate, and challenge your brain regularly.",
  },
  {
    icon: <FaFireAlt className="text-orange-400 text-3xl" />,
    title: "Track Progress",
    desc: "Celebrate small wins and track your journey to stay motivated.",
  },
];

function Advice() {
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
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-pink-400 via-blue-400 to-green-400 text-transparent bg-clip-text mb-4 drop-shadow-lg">
            Powerful Fitness & Wellness Advice
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            Boost your health, energy, and happiness with these science-backed
            tips. Small steps, big results!
          </p>
        </motion.div>
        {/* Advice Cards Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl w-full mb-12"
          initial="hidden"
          animate="visible"
          variants={{
            visible: { transition: { staggerChildren: 0.12 } },
          }}
        >
          {adviceList.map((advice, idx) => (
            <motion.div
              key={advice.title}
              className="relative bg-white/20 dark:bg-slate-900/60 backdrop-blur-xl border border-white/30 dark:border-slate-800/40 rounded-2xl shadow-xl p-7 flex flex-col items-center text-center hover:scale-105 hover:shadow-2xl transition-transform duration-300 group overflow-hidden"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 90,
                damping: 14,
                delay: idx * 0.08,
              }}
            >
              <div className="mb-3 animate-bounce-slow group-hover:scale-110 transition-transform">
                {advice.icon}
              </div>
              <h3 className="text-xl font-bold text-blue-700 dark:text-yellow-300 mb-2 drop-shadow-sm">
                {advice.title}
              </h3>
              <p className="text-base text-gray-700 dark:text-gray-200">
                {advice.desc}
              </p>
              {/* Animated gradient blob */}
              <motion.div
                className="absolute -bottom-8 -right-8 w-32 h-32 rounded-full bg-gradient-to-br from-pink-400 via-blue-400 to-green-400 opacity-20 blur-2xl z-0"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{
                  repeat: Infinity,
                  duration: 6,
                  ease: "easeInOut",
                }}
              />
            </motion.div>
          ))}
        </motion.div>
        {/* Call to Action */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.7 }}
        >
          <h2 className="text-2xl font-bold text-pink-400 mb-2">
            Ready to take action?
          </h2>
          <p className="text-lg text-gray-700 dark:text-gray-200 mb-4">
            Start your journey now and make every day count!
          </p>
          <a
            href="/predict"
            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 text-white font-semibold rounded-full shadow-lg hover:scale-105 transition-transform text-lg"
          >
            Try Calorie Prediction
          </a>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}

export default Advice;
