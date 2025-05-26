import Statistics from "./components/Statistics";
import { ThemeProvider } from "./components/ThemeContext";

<Route path="/statistics" element={<Statistics />} />;

function App() {
  return <ThemeProvider>{/* ... existing app code ... */}</ThemeProvider>;
}
