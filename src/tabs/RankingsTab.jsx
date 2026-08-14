import { useState } from "react";
import TabBtns from "../components/history/TabBtns";
import Leaderboard from "../components/history/rankings/Leaderboard";
import SortDropDown from "../components/history/rankings/SortDropDown";
import LeaderBoardHeader from "../components/history/rankings/LeaderBoardHeader";
import { useGameContext } from "../context/useGameContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

function RankingsTab() {
  const screens = {
    ROUNDS: "rounds",
    SESSIONS: "sessions",
  };

  const { currentSessionStats } = useGameContext();
  const [activeTab, setActiveTab] = useState(screens.ROUNDS);
  console.log(currentSessionStats);

  const OPTIONS = [
    {
      value: "wins",
      text: "Wins",
    },
    {
      value: "averageScore",
      text: "Avg. Score",
    },
    {
      value: "topScore",
      text: "Top Score",
    },
    {
      value: "totalScore",
      text: "Total Pts.",
    },
  ];
  const [selectedSort, setSelectedSort] = useState(
    OPTIONS.find((option) => option.value === "wins"),
  );
  return (
    <>
      <title>Rankings</title>
      <main
        aria-label="history-main"
        className="row-2 flex h-full w-full flex-col self-center justify-self-center overflow-hidden md:w-3xl"
      >
        <div className="grid h-full w-full grid-rows-[3rem_1fr] gap-y-4 self-center justify-self-center overflow-hidden px-4 pb-4">
          {/* <h1 className="row-1 w-[90vw] text-center">HISTORY</h1> */}

          <TabBtns activeTab={activeTab} setActiveTab={setActiveTab} />
          {activeTab === screens.ROUNDS && (
            <>
              {currentSessionStats && (
                <div className="flex h-full scrollbar-none flex-col overflow-y-auto bg-(--primary-)">
                  <>
                    <SortDropDown
                      OPTIONS={OPTIONS}
                      selectedSort={selectedSort}
                      setSelectedSort={setSelectedSort}
                    />
                    <LeaderBoardHeader selectedSort={selectedSort} />
                  </>
                  <Leaderboard OPTIONS={OPTIONS} selectedSort={selectedSort} />
                </div>
              )}
              {!currentSessionStats && (
                <div className="flex h-full flex-col items-center justify-center px-10">
                  {" "}
                  <h1 className="text-center capitalize">
                    {" "}
                    <FontAwesomeIcon icon={faLightbulb} /> Play Some Games TO
                    see ranking...{" "}
                  </h1>
                </div>
              )}
            </>
          )}
          {activeTab === screens.SESSIONS && (
            <div className="flex h-full flex-col items-center justify-center gap-10 px-10 text-center">
              {" "}
              <h4 className="text-center capitalize">
                {" "}
                <FontAwesomeIcon icon={faLightbulb} /> Coming Sooner Than you
                think...{" "}
              </h4>
              <p>
                {" "}
                GoBack to{" "}
                <span
                  onClick={() => setActiveTab(screens.ROUNDS)}
                  className="mx-2 rounded-lg bg-(--primary-color) px-2 text-black"
                >
                  Current
                </span>{" "}
                Session Ranking...?
              </p>
            </div>
          )}
        </div>
      </main>
    </>
  );
}

export default RankingsTab;
