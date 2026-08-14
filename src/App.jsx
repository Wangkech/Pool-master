import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/NavBar/Navbar";
// import { useEffect } from "react";
// import "./components/ActiveGame/active";
import "./css/App.css";
import GameTab from "./tabs/GameTab";
import HistoryTab from "./tabs/HistoryTab";
import RankingsTab from "./tabs/RankingsTab";
import SettingsTab from "./tabs/SettingsTab";
function App() {
  const [view, setView] = useState("home");
  const [isAddingPlayers, setIsAddingPlayers] = useState(false);
  const screens = {
    ROUNDS: "rounds",
    SESSIONS: "sessions",
  };
  const [activeTab, setActiveTab] = useState(screens.ROUNDS);
  return (
    <>
      <Header />
      {view == "home" && (
        <GameTab
          setActiveTab={setActiveTab}
          setView={setView}
          setIsAddingPlayers={setIsAddingPlayers}
          isAddingPlayers={isAddingPlayers}
          setView={setView}
        />
      )}
      {view == "history" && (
        <HistoryTab
          setActiveTab={setActiveTab}
          activeTab={activeTab}
          screens={screens}
          setIsAddingPlayers={setIsAddingPlayers}
          setView={setView}
        />
      )}
      {view === "ranking" && <RankingsTab />}
      {view === "settings" && <SettingsTab setView={setView} />}
      <Navbar setView={setView} view={view} />
    </>
  );
}

export default App;
