import { Routes, Route } from "react-router";
import GamePage from "./pages/GamePage";
import HistoryPage from "./pages/HistoryPage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import "./css/App.css";
// import "./components/ActiveGame/active";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<GamePage />} />
        <Route path="/history" element={<HistoryPage />} />
      </Routes>
      <Navbar />
    </>
  );
}

export default App;
