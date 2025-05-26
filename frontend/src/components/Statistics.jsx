import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
  ScatterChart,
  Scatter,
} from "recharts";
import {
  FaChartBar,
  FaChartPie,
  FaChartLine,
  FaFireAlt,
  FaUsers,
  FaClock,
  FaWeight,
  FaHeartbeat,
} from "react-icons/fa";
import AppBackground from "./AppBackground";
import Footer from "./Footer";
import axios from "axios";
import config from "../config";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff7f50",
  "#00c49f",
  "#0088fe",
  "#ffbb28",
  "#ff8042",
];

function StatCard({ icon, label, value, color }) {
  return (
    <motion.div
      className="flex flex-col items-center justify-center bg-white/80 dark:bg-slate-900/60 backdrop-blur-xl border border-gray-200 dark:border-slate-800/40 rounded-2xl shadow-xl p-6 min-w-[140px] min-h-[120px] text-gray-800 dark:text-white"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={`text-3xl mb-2 ${color}`}>{icon}</div>
      <div className="text-2xl font-bold text-gray-800 dark:text-white mb-1">
        {value}
      </div>
      <div className="text-base text-gray-600 dark:text-gray-300">{label}</div>
    </motion.div>
  );
}

function Statistics() {
  const [summary, setSummary] = useState(null);
  const [distCalories, setDistCalories] = useState([]);
  const [avgByGender, setAvgByGender] = useState([]);
  const [avgByAge, setAvgByAge] = useState([]);
  const [avgByDuration, setAvgByDuration] = useState([]);
  const [topDurations, setTopDurations] = useState([]);
  const [topHeartRates, setTopHeartRates] = useState([]);
  const [corrCaloriesDuration, setCorrCaloriesDuration] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      setError(null);
      try {
        const s = await axios
          .get(`${config.API_URL}/stats/summary`)
          .then((r) => r.data);
        const dist = await axios
          .get(`${config.API_URL}/stats/distribution/Calories`)
          .then((r) => r.data);
        const g = await axios
          .get(`${config.API_URL}/stats/average_by_gender`)
          .then((r) => r.data);
        const a = await axios
          .get(`${config.API_URL}/stats/average_by_age_group`)
          .then((r) => r.data);
        const d = await axios
          .get(`${config.API_URL}/stats/average_by_duration_bin`)
          .then((r) => r.data);
        const td = await axios
          .get(`${config.API_URL}/stats/top_durations`)
          .then((r) => r.data);
        const th = await axios
          .get(`${config.API_URL}/stats/top_heart_rates`)
          .then((r) => r.data);
        const corr = await axios
          .get(`${config.API_URL}/stats/correlation/Calories_vs_Duration`)
          .then((r) => r.data);
        setSummary(s);
        setDistCalories(
          Array.isArray(dist.bins) &&
            Array.isArray(dist.counts) &&
            dist.bins.length > 1 &&
            dist.counts.length > 0
            ? dist.bins.slice(0, -1).map((bin, i) => ({
                bin: `${Math.round(dist.bins[i])}-${Math.round(
                  dist.bins[i + 1]
                )}`,
                value: dist.counts[i],
              }))
            : []
        );
        setAvgByGender(Array.isArray(g) ? g : []);
        setAvgByAge(Array.isArray(a) ? a : []);
        setAvgByDuration(Array.isArray(d) ? d : []);
        setTopDurations(Array.isArray(td) ? td : []);
        setTopHeartRates(Array.isArray(th) ? th : []);
        setCorrCaloriesDuration(Array.isArray(corr.points) ? corr.points : []);
        // Debug logs
        console.log("summary", s);
        console.log("distCalories", dist.bins);
        console.log("avgByGender", g);
        console.log("avgByAge", a);
        console.log("avgByDuration", d);
        console.log("topDurations", td);
        console.log("topHeartRates", th);
        console.log("corrCaloriesDuration", corr.points);
      } catch (err) {
        setError(
          "Failed to load statistics. Please ensure the backend is running and accessible."
        );
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, []);

  return (
    <div className="min-h-screen w-full flex flex-col justify-between pt-28 pb-8 relative bg-white dark:bg-gray-900">
      <AppBackground />
      <main className="relative z-10 flex flex-col items-center w-full px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-blue-400 via-pink-400 to-yellow-400 text-transparent bg-clip-text mb-4 drop-shadow-lg">
            CalorieAI Statistics & Insights
          </h1>
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-200 max-w-2xl mx-auto">
            Explore powerful analytics and trends from our calorie prediction
            data. Visualize, compare, and discover insights!
          </p>
        </motion.div>
        {loading ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <FaChartBar className="text-5xl text-blue-400 animate-pulse mb-4" />
            <div className="text-xl font-bold text-blue-400 animate-pulse">
              Loading statistics...
            </div>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center min-h-[40vh]">
            <FaChartBar className="text-5xl text-red-400 animate-pulse mb-4" />
            <div className="text-xl font-bold text-red-400 animate-pulse">
              {error}
            </div>
          </div>
        ) : (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12 w-full max-w-5xl mx-auto">
              <StatCard
                icon={<FaUsers />}
                label="Total Records"
                value={summary.total_records}
                color="text-blue-400"
              />
              <StatCard
                icon={<FaFireAlt />}
                label="Avg Calories"
                value={summary.avg_calories.toFixed(1)}
                color="text-pink-400"
              />
              <StatCard
                icon={<FaClock />}
                label="Avg Duration (min)"
                value={summary.avg_duration.toFixed(1)}
                color="text-yellow-400"
              />
              <StatCard
                icon={<FaWeight />}
                label="Avg Weight (kg)"
                value={summary.avg_weight.toFixed(1)}
                color="text-green-400"
              />
            </div>
            {/* Charts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-6xl mx-auto mb-16">
              {/* Calories Distribution */}
              <motion.div
                className="bg-white/80 dark:bg-slate-900/60 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-gray-200 dark:border-slate-800/40 text-gray-800 dark:text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2 text-blue-500 font-bold">
                  <FaChartBar /> Calories Burnt Distribution
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  {Array.isArray(distCalories) && distCalories.length > 0 ? (
                    <BarChart data={distCalories}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="bin"
                        tick={false}
                        label={{
                          value: "Calories Bin",
                          position: "insideBottom",
                          offset: -5,
                        }}
                      />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="value" fill="#8884d8" />
                    </BarChart>
                  ) : (
                    <div className="text-red-400">No data</div>
                  )}
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 mt-2">
                  Shows the distribution of calories burnt across all records.
                </p>
              </motion.div>
              {/* Average by Gender */}
              <motion.div
                className="bg-white/80 dark:bg-slate-900/60 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-gray-200 dark:border-slate-800/40 text-gray-800 dark:text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center gap-2 mb-2 text-pink-500 font-bold">
                  <FaChartPie /> Avg Calories by Gender
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  {Array.isArray(avgByGender) && avgByGender.length > 0 ? (
                    <PieChart>
                      <Pie
                        data={avgByGender}
                        dataKey="avg_calories"
                        nameKey="gender"
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        label
                      >
                        {avgByGender.map((entry, idx) => (
                          <Cell
                            key={`cell-${idx}`}
                            fill={COLORS[idx % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  ) : (
                    <div className="text-red-400">No data</div>
                  )}
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 mt-2">
                  Compares average calories burnt by gender.
                </p>
              </motion.div>
              {/* Average by Age Group */}
              <motion.div
                className="bg-white/80 dark:bg-slate-900/60 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-gray-200 dark:border-slate-800/40 text-gray-800 dark:text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="flex items-center gap-2 mb-2 text-green-500 font-bold">
                  <FaChartBar /> Avg Calories by Age Group
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  {Array.isArray(avgByAge) && avgByAge.length > 0 ? (
                    <BarChart data={avgByAge}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="age_group" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avg_calories" fill="#82ca9d" />
                    </BarChart>
                  ) : (
                    <div className="text-red-400">No data</div>
                  )}
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 mt-2">
                  Shows how calorie burn varies by age group.
                </p>
              </motion.div>
              {/* Average by Duration Bin */}
              <motion.div
                className="bg-white/80 dark:bg-slate-900/60 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-gray-200 dark:border-slate-800/40 text-gray-800 dark:text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <div className="flex items-center gap-2 mb-2 text-yellow-500 font-bold">
                  <FaChartBar /> Avg Calories by Duration
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  {Array.isArray(avgByDuration) && avgByDuration.length > 0 ? (
                    <BarChart data={avgByDuration}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="duration_bin" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="avg_calories" fill="#ffc658" />
                    </BarChart>
                  ) : (
                    <div className="text-red-400">No data</div>
                  )}
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 mt-2">
                  Shows how calorie burn changes with workout duration.
                </p>
              </motion.div>
              {/* Top Durations */}
              <motion.div
                className="bg-white/80 dark:bg-slate-900/60 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-gray-200 dark:border-slate-800/40 text-gray-800 dark:text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex items-center gap-2 mb-2 text-blue-500 font-bold">
                  <FaClock /> Most Common Durations
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  {Array.isArray(topDurations) && topDurations.length > 0 ? (
                    <BarChart data={topDurations}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="duration" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#0088fe" />
                    </BarChart>
                  ) : (
                    <div className="text-red-400">No data</div>
                  )}
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 mt-2">
                  Top 7 most common workout durations.
                </p>
              </motion.div>
              {/* Top Heart Rates */}
              <motion.div
                className="bg-white/80 dark:bg-slate-900/60 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-gray-200 dark:border-slate-800/40 text-gray-800 dark:text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="flex items-center gap-2 mb-2 text-red-500 font-bold">
                  <FaHeartbeat /> Most Common Heart Rates
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  {Array.isArray(topHeartRates) && topHeartRates.length > 0 ? (
                    <BarChart data={topHeartRates}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="heart_rate" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="count" fill="#ff7f50" />
                    </BarChart>
                  ) : (
                    <div className="text-red-400">No data</div>
                  )}
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 mt-2">
                  Top 7 most common heart rates.
                </p>
              </motion.div>
              {/* Calories vs Duration Scatter */}
              <motion.div
                className="bg-white/80 dark:bg-slate-900/60 rounded-2xl shadow-xl p-6 flex flex-col items-center border border-gray-200 dark:border-slate-800/40 text-gray-800 dark:text-white"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="flex items-center gap-2 mb-2 text-purple-500 font-bold">
                  <FaChartLine /> Calories vs Duration
                </div>
                <ResponsiveContainer width="100%" height={220}>
                  {Array.isArray(corrCaloriesDuration) &&
                  corrCaloriesDuration.length > 0 ? (
                    <ScatterChart>
                      <CartesianGrid />
                      <XAxis dataKey="x" name="Calories" />
                      <YAxis dataKey="y" name="Duration" />
                      <Tooltip cursor={{ strokeDasharray: "3 3" }} />
                      <Scatter data={corrCaloriesDuration} fill="#8884d8" />
                    </ScatterChart>
                  ) : (
                    <div className="text-red-400">No data</div>
                  )}
                </ResponsiveContainer>
                <p className="text-xs text-gray-500 mt-2">
                  Each point is a workout: calories burnt vs. duration.
                </p>
              </motion.div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}

export default Statistics;
