// App.js
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import PredictionForm from "./components/PredictionForm";
import Navbar from "./components/Navbar";
import Advice from "./components/Advice";
import Info from "./components/Info";
import Statistics from "./components/Statistics";
import { ThemeProvider } from "./components/ThemeContext";
/* import InfoPage from "./components/InfoPage";
import StatisticsPage from "./components/StatisticsPage";
import AdvicePage from "./components/AdvicePage";
 */
// import AppBackground from "./components/AppBackground";

function App() {
  return (
    <ThemeProvider>
      <Router>
        <div className="min-h-screen w-full relative overflow-x-hidden">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<PredictionForm />} />
            {/*           } />
          } />
           */}
            <Route path="/advice" element={<Advice />} />
            <Route path="/info" element={<Info />}></Route>
            <Route path="/statistics" element={<Statistics />}></Route>
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
