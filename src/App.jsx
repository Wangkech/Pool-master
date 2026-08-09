import { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
// import { useEffect } from "react";
// import "./components/ActiveGame/active";
import "./css/App.css";
import GameTab from "./tabs/GameTab";
import HistoryTab from "./tabs/HistoryTab";
function App() {
  const [view, setView] = useState("home")
  const [isAddingPlayers, setIsAddingPlayers] = useState(false);

  return (
    <>
      <Header />
      {view == "home" && <GameTab setView={setView} setIsAddingPlayers={setIsAddingPlayers} isAddingPlayers={isAddingPlayers} setView={setView} />}
      {view == 'history' && <HistoryTab setIsAddingPlayers={setIsAddingPlayers} setView={setView} />}
      <Navbar setView={setView} />
    </>
  );
}

export default App;
