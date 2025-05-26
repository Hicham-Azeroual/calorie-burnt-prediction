import { motion, useMotionValue, useTransform } from "framer-motion";
import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaBolt, FaChartLine, FaUserShield } from "react-icons/fa";
import Footer from "./Footer";
import AppBackground from "./AppBackground";

// Particle field as a React component
function ParticleField() {
  // Simple canvas-based animated particles
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let particles = Array.from({ length: 60 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      r: Math.random() * 2 + 1,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      o: Math.random() * 0.5 + 0.3,
    }));
    let animation;
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let p of particles) {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${p.o})`;
        ctx.shadowColor = "#fff";
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
        p.x += p.dx;
        p.y += p.dy;
        if (p.x < 0 || p.x > canvas.width) p.dx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.dy *= -1;
      }
      animation = requestAnimationFrame(draw);
    }
    draw();
    return () => cancelAnimationFrame(animation);
  }, []);
  return (
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      className="fixed inset-0 w-full h-full z-0 pointer-events-none"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
      }}
    />
  );
}

function Home() {
  // Parallax for SVG blobs
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const xBlob1 = useTransform(mouseX, [0, 1], [0, 60]);
  const yBlob1 = useTransform(mouseY, [0, 1], [0, 40]);
  const xBlob2 = useTransform(mouseX, [0, 1], [0, -40]);
  const yBlob2 = useTransform(mouseY, [0, 1], [0, -30]);
  const handleMouseMove = (e) => {
    mouseX.set(e.clientX / window.innerWidth);
    mouseY.set(e.clientY / window.innerHeight);
  };

  return (
    <div
      className="min-h-screen w-full relative overflow-hidden flex flex-col items-center justify-center pt-28"
      onMouseMove={handleMouseMove}
    >
      <AppBackground />
      {/* Particle Field */}
      <ParticleField />
      {/* Animated SVG Blobs with Parallax */}
      <motion.svg
        className="absolute top-[-200px] left-[-200px] z-0"
        width="700"
        height="700"
        style={{ x: xBlob1, y: yBlob1 }}
      >
        <defs>
          <radialGradient id="blob1" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#ff7cfb" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#1a1a40" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="350" cy="350" rx="320" ry="300" fill="url(#blob1)" />
      </motion.svg>
      <motion.svg
        className="absolute bottom-[-180px] right-[-180px] z-0"
        width="500"
        height="500"
        style={{ x: xBlob2, y: yBlob2 }}
      >
        <defs>
          <radialGradient id="blob2" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#7cfbff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#1a1a40" stopOpacity="0" />
          </radialGradient>
        </defs>
        <ellipse cx="250" cy="250" rx="220" ry="200" fill="url(#blob2)" />
      </motion.svg>
      {/* Glowing Halo behind Hero */}
      <motion.div
        className="absolute top-32 left-1/2 -translate-x-1/2 w-[420px] h-[220px] rounded-full bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 opacity-30 blur-3xl z-10"
        animate={{ scale: [1, 1.08, 1], opacity: [0.25, 0.35, 0.25] }}
        transition={{ repeat: Infinity, duration: 7, ease: "easeInOut" }}
      />
      {/* Hero Section */}
      <section className="relative z-20 flex flex-col items-center justify-center pt-20 pb-10 px-4">
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-blue-400 to-pink-400 mb-6 drop-shadow-2xl text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.7 }}
        >
          Predict <span className="text-blue-300">Your</span>{" "}
          <span className="text-yellow-400">Calories Burnt</span> Instantly
        </motion.h1>
        <motion.p
          className="text-lg md:text-xl text-gray-200 mb-8 text-center max-w-2xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
        >
          AI-powered, fast, and accurate calorie burn predictions for your
          workouts. Enter your details and get instant insights to optimize your
          fitness journey.
        </motion.p>
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
        >
          <Link to="/predict">
            <button className="px-12 py-4 bg-gradient-to-r from-yellow-400 via-pink-400 to-blue-400 text-white text-xl font-semibold rounded-full shadow-2xl hover:scale-105 hover:from-blue-200 hover:to-pink-200 transition-transform duration-300">
              Start Prediction
            </button>
          </Link>
        </motion.div>
      </section>
      {/* Quick Links Section */}
      <section className="relative z-20 flex flex-col items-center pb-10 px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl w-full">
          <Link to="/info" className="group">
            <motion.div
              className="bg-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-white/20 backdrop-blur-xl group-hover:scale-105 transition-transform duration-300 hover:shadow-2xl hover:bg-white/20"
              whileHover={{ scale: 1.07 }}
            >
              <span className="text-4xl mb-3">ℹ️</span>
              <span className="text-lg font-semibold text-blue-300">
                Information
              </span>
              <span className="text-gray-300 mt-2 text-center">
                Learn more about how CalorieAI works and the science behind it.
              </span>
            </motion.div>
          </Link>
          <Link to="/statistics" className="group">
            <motion.div
              className="bg-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-white/20 backdrop-blur-xl group-hover:scale-105 transition-transform duration-300 hover:shadow-2xl hover:bg-white/20"
              whileHover={{ scale: 1.07 }}
            >
              <span className="text-4xl mb-3">📊</span>
              <span className="text-lg font-semibold text-pink-300">
                Statistics
              </span>
              <span className="text-gray-300 mt-2 text-center">
                See usage stats, trends, and insights from our users.
              </span>
            </motion.div>
          </Link>
          <Link to="/advice" className="group">
            <motion.div
              className="bg-white/10 rounded-2xl shadow-2xl p-8 flex flex-col items-center border border-white/20 backdrop-blur-xl group-hover:scale-105 transition-transform duration-300 hover:shadow-2xl hover:bg-white/20"
              whileHover={{ scale: 1.07 }}
            >
              <span className="text-4xl mb-3">💡</span>
              <span className="text-lg font-semibold text-yellow-300">
                Advice
              </span>
              <span className="text-gray-300 mt-2 text-center">
                Get personalized tips and advice to improve your fitness
                journey.
              </span>
            </motion.div>
          </Link>
        </div>
      </section>
      {/* Features Section */}
      <section className="relative z-20 flex flex-col items-center pb-24 px-4">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-yellow-400 via-blue-400 to-pink-400 text-transparent bg-clip-text drop-shadow-md"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.7 }}
        >
          Why Use CalorieAI?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl w-full">
          {/* Feature 1 */}
          <motion.div
            className="bg-white/10 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-white/20 backdrop-blur-xl hover:scale-105 transition-transform duration-300 hover:shadow-3xl hover:bg-white/20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.7 }}
            whileHover={{ scale: 1.07 }}
          >
            <FaBolt className="text-5xl text-yellow-400 mb-5 drop-shadow-lg" />
            <h3 className="text-2xl font-bold mb-3 text-blue-300">
              Instant Results
            </h3>
            <p className="text-gray-200 text-center text-lg">
              Get your calorie burn prediction in seconds, no waiting or
              registration required.
            </p>
          </motion.div>
          {/* Feature 2 */}
          <motion.div
            className="bg-white/10 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-white/20 backdrop-blur-xl hover:scale-105 transition-transform duration-300 hover:shadow-3xl hover:bg-white/20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.7 }}
            whileHover={{ scale: 1.07 }}
          >
            <FaChartLine className="text-5xl text-pink-400 mb-5 drop-shadow-lg" />
            <h3 className="text-2xl font-bold mb-3 text-yellow-400">
              AI Accuracy
            </h3>
            <p className="text-gray-200 text-center text-lg">
              Powered by advanced machine learning for reliable, science-backed
              results.
            </p>
          </motion.div>
          {/* Feature 3 */}
          <motion.div
            className="bg-white/10 rounded-3xl shadow-2xl p-10 flex flex-col items-center border border-white/20 backdrop-blur-xl hover:scale-105 transition-transform duration-300 hover:shadow-3xl hover:bg-white/20"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.7, duration: 0.7 }}
            whileHover={{ scale: 1.07 }}
          >
            <FaUserShield className="text-5xl text-blue-400 mb-5 drop-shadow-lg" />
            <h3 className="text-2xl font-bold mb-3 text-pink-400">
              Privacy First
            </h3>
            <p className="text-gray-200 text-center text-lg">
              No data is stored. Your information is used only for your
              prediction, then gone forever.
            </p>
          </motion.div>
        </div>
      </section>
      {/* Footer */}
      <Footer />
    </div>
  );
}
export default Home;
