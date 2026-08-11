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
  const [view, setView] = useState("history");
  const [isAddingPlayers, setIsAddingPlayers] = useState(false);

  return (
    <>
      <Header />
      {view == "home" && (
        <GameTab
          setView={setView}
          setIsAddingPlayers={setIsAddingPlayers}
          isAddingPlayers={isAddingPlayers}
          setView={setView}
        />
      )}
      {view == "history" && (
        <HistoryTab setIsAddingPlayers={setIsAddingPlayers} setView={setView} />
      )}
      {view === "ranking" && <RankingsTab />}
      {view === "settings" && <SettingsTab />}
      <Navbar setView={setView} view={view} />
    </>
  );
}

export default App;
