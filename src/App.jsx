import { Routes, Route } from "react-router";
import GamePage from "./pages/GamePage";
import HistoryPage from "./pages/HistoryPage";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
// import { useEffect } from "react";
// import "./components/ActiveGame/active";
import "./css/App.css";
function App() {
  // useEffect(() => {
  //   import("./css/App.css")
  //     .then(() => {
  //       console.log("CSS loaded");
  //     })
  //     .catch((err) => {
  //       console.error("failed to load CSS", err);
  //     });
  // }, []);
  return (
    <>
      <title>Pool Master - scoreTracker</title>

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
