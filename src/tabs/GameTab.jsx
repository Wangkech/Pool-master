import { useState } from "react";
import { useGameContext } from "../context/useGameContext.js";
import Container from "../components/Container.jsx";
import AddPlayerModal from "../components/AddPlayerModal/AddPlayerModal.jsx";
// import StartNewGame from "../components/StartNewGame.jsx";
import ActiveGameContainer from "../components/ActiveGame/ActiveGameContainer.jsx";
import ModeCard from "./ModeCard.jsx";
import { faRightLeft, faUserFriends } from "@fortawesome/free-solid-svg-icons";

function GameTab({
  setView,
  isAddingPlayers,
  setActiveTab,
  setIsAddingPlayers,
}) {
  const { gameState, currentRoundExists, gameOn } = useGameContext();
  const [additionType, setAdditionType] = useState("regular");

  function handleStartNormal() {
    setView("home");
    setIsAddingPlayers(true);
  }
  return (
    <>
      <title>Pool Master - scoreTracker</title>
      <Container
        child={
          <>
            {isAddingPlayers === true && (
              <AddPlayerModal
                additionType={additionType}
                setIsAddingPlayers={setIsAddingPlayers}
                gameState={gameState}
              />
            )}
            {isAddingPlayers === false && gameOn === false && (
              <div className="flex h-full w-[90%] flex-col items-center justify-center gap-4 rounded-2xl bg-(--acccent-bg) px-4">
                {/* <h2>Welcome...</h2> */}
                {/* {/* <div className="flex h-20 items-center justify-center gap-4">
                  <img className="h-10" src={logoInWhite} alt="alt" />
                  {/* <p className="text">POOL MASTER</p> *
                </div> */}
                <h2 className="text-xl antialiased">Choose Game Mode</h2>
                <div className="bg-ed-100 items- grid h-1/2 w-full grid-cols-2 gap-8">
                  {/* <div className="bg-blue700 h-30 rounded-2xl">
                    {" "}
                    <StartNewGame
                      tab="home"
                      setView={setView}
                      setIsAddingPlayers={setIsAddingPlayers}
                    />
                  </div> */}
                  <ModeCard
                    badge={"No Danya"}
                    clickHandler={handleStartNormal}
                    text={"Normal"}
                    icon={faUserFriends}
                    setIsAddingPlayers={setIsAddingPlayers}
                  />
                  <ModeCard
                    badge={"With Danya"}
                    icon={faRightLeft}

                    text={"Substitution |  Danya"}
                  />
                </div>
              </div>
            )}
            {currentRoundExists &&
              gameOn === true &&
              isAddingPlayers === false && (
                <ActiveGameContainer
                  setView={setView}
                  setAdditionType={setAdditionType}
                  setIsAddingPlayers={setIsAddingPlayers}
                  setActiveTab={setActiveTab}
                />
              )}
          </>
        }
      />
    </>
  );
}

export default GameTab;
