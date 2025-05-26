// Navbar.js
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaSun,
  FaMoon,
  FaHome,
  FaChartLine,
  FaInfoCircle,
  FaChartBar,
  FaLightbulb,
} from "react-icons/fa";
import { useTheme } from "./ThemeContext";
import { useState, useEffect } from "react";

function Navbar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [hoveredLink, setHoveredLink] = useState(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { path: "/", name: "Accueil", icon: FaHome, activeColor: "text-blue-400" },
    {
      path: "/predict",
      name: "Prédire",
      icon: FaChartLine,
      activeColor: "text-purple-400",
    },
    {
      path: "/info",
      name: "Info",
      icon: FaInfoCircle,
      activeColor: "text-green-400",
    },
    {
      path: "/statistics",
      name: "Statistiques",
      icon: FaChartBar,
      activeColor: "text-yellow-400",
    },
    {
      path: "/advice",
      name: "Conseils",
      icon: FaLightbulb,
      activeColor: "text-pink-400",
    },
  ];

  const navbarVariants = {
    hidden: { y: -100, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  const linkVariants = {
    hover: {
      scale: 1.1,
      rotateY: 10,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10,
      },
    },
  };

  return (
    <motion.nav
      initial="hidden"
      animate="visible"
      variants={navbarVariants}
      className={`w-full z-[1000] fixed top-0 left-0 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-shrink-0"
          >
            <Link
              to="/"
              className="text-2xl font-extrabold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 text-transparent bg-clip-text tracking-tight hover:filter hover:brightness-110 transition-all duration-300"
            >
              CalorieAI
            </Link>
          </motion.div>

          <div className="flex items-center gap-4 md:gap-6">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <motion.div
                  key={link.path}
                  variants={linkVariants}
                  whileHover="hover"
                  onHoverStart={() => setHoveredLink(link.path)}
                  onHoverEnd={() => setHoveredLink(null)}
                  className="relative"
                >
                  <Link
                    to={link.path}
                    className={`flex items-center gap-2 font-medium transition-all duration-300 ${
                      location.pathname === link.path
                        ? `${link.activeColor} font-semibold`
                        : "text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
                    }`}
                  >
                    <motion.div
                      animate={{
                        rotateY: hoveredLink === link.path ? 360 : 0,
                        scale: hoveredLink === link.path ? 1.2 : 1,
                      }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="text-xl" />
                    </motion.div>
                    <span className="hidden md:inline">{link.name}</span>
                  </Link>
                  <AnimatePresence>
                    {hoveredLink === link.path && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400"
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}

            <motion.button
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleTheme}
              className="ml-4 p-2 rounded-full bg-white/30 dark:bg-slate-800/50 shadow-lg hover:shadow-xl transition-all duration-300 border border-white/30 dark:border-slate-700/50 backdrop-blur-sm"
              aria-label="Changer le thème"
            >
              <motion.div
                animate={{ rotate: theme === "dark" ? 180 : 0 }}
                transition={{ duration: 0.5 }}
              >
                {theme === "dark" ? (
                  <FaSun className="text-yellow-300 text-xl" />
                ) : (
                  <FaMoon className="text-blue-500 text-xl" />
                )}
              </motion.div>
            </motion.button>
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

export default Navbar;
