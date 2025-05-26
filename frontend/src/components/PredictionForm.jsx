import { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import { FaFireAlt, FaRunning, FaTimes } from "react-icons/fa";
import Footer from "./Footer";
import AppBackground from "./AppBackground";
import config from "../config";

const fieldIcons = {
  gender: "🚻",
  age: "🎂",
  height: "📏",
  weight: "⚖️",
  duration: "⏱️",
  heart_rate: "💓",
  body_temp: "🌡️",
};

const fieldLabels = {
  gender: "Gender",
  age: "Age",
  height: "Height (cm)",
  weight: "Weight (kg)",
  duration: "Duration (min)",
  heart_rate: "Heart Rate (bpm)",
  body_temp: "Body Temp (°C)",
};

function PredictionForm() {
  const [formData, setFormData] = useState({
    gender: "male",
    age: "",
    height: "",
    weight: "",
    duration: "",
    heart_rate: "",
    body_temp: "",
  });
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  const validationRules = {
    age: { min: 20, max: 79, message: "Age must be 20-79" },
    height: { min: 123, max: 222, message: "Height must be 123-222 cm" },
    weight: { min: 36, max: 132, message: "Weight must be 36-132 kg" },
    duration: { min: 1, max: 30, message: "Duration must be 1-30 minutes" },
    heart_rate: { min: 67, max: 128, message: "Heart rate must be 67-128 bpm" },
    body_temp: {
      min: 37.1,
      max: 41.5,
      message: "Body temp must be 37.1-41.5°C",
    },
  };

  const validateField = (name, value) => {
    if (!value && name !== "gender") return "Required";
    if (name === "gender") return null;
    const numValue = parseFloat(value);
    const rule = validationRules[name];
    if (rule && (numValue < rule.min || numValue > rule.max)) {
      return rule.message;
    }
    return null;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFieldErrors({ ...fieldErrors, [name]: validateField(name, value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);
    setLoading(true);
    try {
      const errors = {};
      Object.keys(formData).forEach((key) => {
        const error = validateField(key, formData[key]);
        if (error) errors[key] = error;
      });
      if (Object.keys(errors).length > 0) {
        setFieldErrors(errors);
        throw new Error("Please fix form errors");
      }
      // Simulate loading for effect
      await new Promise((res) => setTimeout(res, 1200));
      const response = await axios.post(`${config.API_URL}/predict`, {
        gender: formData.gender,
        age: parseFloat(formData.age),
        height: parseFloat(formData.height),
        weight: parseFloat(formData.weight),
        duration: parseFloat(formData.duration),
        heart_rate: parseFloat(formData.heart_rate),
        body_temp: parseFloat(formData.body_temp),
      });
      if (response.data.status === "success") {
        setPrediction(response.data.prediction);
        setShowModal(true);
      } else {
        setError(response.data.message || "Prediction failed");
      }
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Error occurred");
    } finally {
      setLoading(false);
    }
  };

  const hasErrors = Object.values(fieldErrors).some((error) => error);

  // Animation variants
  const containerVariants = {
    initial: {},
    animate: { transition: { staggerChildren: 0.08 } },
  };
  const fieldVariants = {
    initial: { opacity: 0, y: 30, scale: 0.97 },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: "spring", stiffness: 80, damping: 12 },
    },
  };

  return (
    <div className="min-h-screen w-full flex flex-col justify-between pt-28 pb-8 px-4 relative bg-white dark:bg-gray-900">
      <AppBackground />
      <div className="flex-1 flex items-center justify-center relative z-10">
        <motion.div
          className="w-full max-w-2xl mx-auto bg-white/80 dark:bg-slate-800/50 backdrop-blur-xl rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700/50 p-0 md:p-0 overflow-visible text-gray-800 dark:text-white"
          style={{
            boxShadow: "0 8px 40px 0 rgba(80,60,180,0.18)",
            position: "relative",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Layered gradients for creative effect */}
          <div className="absolute -top-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 opacity-30 rounded-full blur-2xl z-0" />
          <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-yellow-300 via-pink-400 to-blue-400 opacity-30 rounded-full blur-2xl z-0" />
          <div className="relative z-10 p-8 md:p-12">
            <div className="text-center mb-8">
              <motion.div
                initial={{ rotate: -20, scale: 0.8 }}
                animate={{ rotate: 0, scale: 1 }}
                transition={{ type: "spring", stiffness: 120 }}
              >
                <FaFireAlt className="mx-auto text-5xl text-yellow-400 drop-shadow-lg animate-pulse" />
              </motion.div>
              <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white mb-2 tracking-tight drop-shadow-lg">
                Calorie Prediction
              </h2>
              <p className="text-blue-400 dark:text-blue-300 text-lg font-medium">
                Enter your workout details below
              </p>
            </div>
            <motion.form
              onSubmit={handleSubmit}
              className="space-y-7"
              variants={containerVariants}
              initial="initial"
              animate="animate"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Object.entries(formData).map(([name, value], idx) => (
                  <motion.div
                    key={name}
                    variants={fieldVariants}
                    whileHover={{
                      scale: 1.03,
                      boxShadow: "0 4px 24px 0 rgba(80,60,180,0.10)",
                    }}
                    className="relative bg-white/80 dark:bg-slate-700/60 rounded-xl px-4 py-3 shadow-md flex flex-col transition-all duration-200 text-gray-800 dark:text-white"
                  >
                    <label className="block text-sm font-semibold text-gray-700 dark:text-gray-200 mb-1 flex items-center gap-2">
                      <span className="text-lg">{fieldIcons[name]}</span>
                      {fieldLabels[name]}
                    </label>
                    {name === "gender" ? (
                      <select
                        name={name}
                        value={value}
                        onChange={handleChange}
                        className="w-full bg-transparent border border-gray-300 dark:border-slate-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base text-gray-800 dark:text-white"
                      >
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    ) : (
                      <input
                        type="number"
                        name={name}
                        value={value}
                        onChange={handleChange}
                        placeholder={
                          validationRules[name]?.min
                            ? `${validationRules[name].min}-${validationRules[name].max}`
                            : ""
                        }
                        className={`w-full bg-transparent border ${
                          fieldErrors[name]
                            ? "border-red-400"
                            : "border-gray-300 dark:border-slate-600"
                        } rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-base text-gray-800 dark:text-white`}
                      />
                    )}
                    {fieldErrors[name] && (
                      <motion.p
                        className="text-red-400 text-xs mt-1"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                      >
                        {fieldErrors[name]}
                      </motion.p>
                    )}
                  </motion.div>
                ))}
              </div>
              <motion.button
                type="submit"
                className={`w-full py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold rounded-xl shadow-lg ${
                  loading || hasErrors
                    ? "opacity-70 cursor-not-allowed"
                    : "hover:opacity-90"
                } transition-all flex items-center justify-center text-lg mt-2`}
                whileHover={!loading && !hasErrors ? { scale: 1.04 } : {}}
                whileTap={!loading && !hasErrors ? { scale: 0.98 } : {}}
                disabled={loading || hasErrors}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <FaFireAlt className="animate-bounce text-yellow-400 text-2xl" />
                    <span className="tracking-widest animate-pulse">
                      Calculating...
                    </span>
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <FaFireAlt className="text-yellow-400 text-2xl animate-pulse" />
                    Predict Calories
                  </span>
                )}
              </motion.button>
              <AnimatePresence>
                {loading && (
                  <motion.div
                    key="loader"
                    className="absolute inset-0 flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/80 rounded-3xl z-20"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <motion.div
                      className="mb-4"
                      initial={{ scale: 0.7, rotate: -20 }}
                      animate={{ scale: [0.7, 1.1, 1], rotate: [0, 360] }}
                      transition={{
                        repeat: Infinity,
                        duration: 2,
                        ease: "easeInOut",
                      }}
                    >
                      <FaFireAlt className="text-6xl text-yellow-400 drop-shadow-xl animate-pulse" />
                    </motion.div>
                    <motion.div
                      className="w-40 h-3 bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 rounded-full overflow-hidden mb-2"
                      initial={{ width: 0 }}
                      animate={{ width: "10rem" }}
                      transition={{ duration: 1.2 }}
                    >
                      <motion.div
                        className="h-full bg-white/60 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{
                          duration: 1.2,
                          repeat: Infinity,
                          repeatType: "reverse",
                        }}
                      />
                    </motion.div>
                    <motion.p className="text-lg font-bold text-blue-500 animate-pulse mt-2">
                      Calculating your burn...
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
              {error && (
                <motion.div
                  className="p-3 bg-red-400/20 border border-red-400/30 rounded-lg text-red-500 dark:text-red-300 text-center mt-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  {error}
                </motion.div>
              )}
            </motion.form>
          </div>
        </motion.div>
        {/* Modal for result */}
        <AnimatePresence>
          {showModal && prediction && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/40 backdrop-blur-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div
                className="relative bg-white/95 dark:bg-slate-900/90 rounded-3xl shadow-2xl border border-gray-200 dark:border-slate-700/50 p-6 pt-8 w-full max-w-lg mx-auto flex flex-col items-center animate-in fade-in zoom-in mt-6 text-gray-800 dark:text-white"
                initial={{ scale: 0.8, opacity: 0, y: 60 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0, y: 60 }}
                transition={{ type: "spring", stiffness: 120, damping: 18 }}
              >
                <button
                  className="absolute top-2 right-2 z-20 text-gray-400 hover:text-red-400 text-2xl focus:outline-none bg-white/70 dark:bg-slate-800/70 rounded-full p-1 shadow-lg"
                  onClick={() => setShowModal(false)}
                  aria-label="Close"
                >
                  <FaTimes />
                </button>
                <motion.div
                  className="mb-3"
                  initial={{ scale: 0.7, rotate: -20 }}
                  animate={{ scale: [0.7, 1.1, 1], rotate: [0, 360] }}
                  transition={{
                    repeat: Infinity,
                    duration: 2,
                    ease: "easeInOut",
                  }}
                >
                  <FaFireAlt className="text-4xl text-yellow-400 drop-shadow-xl animate-pulse" />
                </motion.div>
                <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2 text-center">
                  Your Calorie Burn Result
                </h3>
                <motion.div
                  className="w-full grid grid-cols-1 sm:grid-cols-2 gap-2 mb-4"
                  initial="initial"
                  animate="animate"
                  variants={{
                    animate: { transition: { staggerChildren: 0.06 } },
                  }}
                >
                  {Object.entries(formData).map(([name, value], idx) => (
                    <motion.div
                      key={name}
                      className="flex items-center gap-2 bg-gradient-to-r from-white/70 via-blue-100/60 to-purple-100/60 dark:from-slate-800/80 dark:via-slate-900/60 dark:to-blue-900/60 rounded-xl shadow-md px-3 py-2 border border-white/40 dark:border-slate-700/40 backdrop-blur-md"
                      initial={{ opacity: 0, y: 20, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 90,
                        damping: 14,
                        delay: idx * 0.05,
                      }}
                    >
                      <span className="text-xl">{fieldIcons[name]}</span>
                      <div className="flex flex-col">
                        <span className="text-xs font-semibold uppercase tracking-wide text-blue-400 dark:text-yellow-300">
                          {fieldLabels[name]}
                        </span>
                        <span className="text-base font-bold text-gray-700 dark:text-white">
                          {value}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
                <motion.div
                  className="my-3 flex flex-col items-center"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 120, damping: 10 }}
                >
                  <FaRunning className="text-3xl text-green-400 mb-1 animate-bounce" />
                  <span className="text-3xl font-extrabold text-green-500 dark:text-green-300 drop-shadow-lg">
                    {prediction} kcal
                  </span>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Estimated calories burnt
                  </span>
                </motion.div>
                {/* Reduced confetti effect */}
                <motion.div
                  className="absolute inset-0 pointer-events-none"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2, duration: 0.5 }}
                >
                  <svg width="100%" height="80%">
                    {[...Array(12)].map((_, i) => (
                      <motion.circle
                        key={i}
                        cx={Math.random() * 300 + 50}
                        cy={Math.random() * 150 + 20}
                        r={Math.random() * 4 + 2}
                        fill={`hsl(${Math.random() * 360},90%,70%)`}
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: [0, 1.2, 1], opacity: [0, 1, 0.5] }}
                        transition={{ delay: 0.2 + i * 0.03, duration: 0.5 }}
                      />
                    ))}
                  </svg>
                </motion.div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
}

export default PredictionForm;
