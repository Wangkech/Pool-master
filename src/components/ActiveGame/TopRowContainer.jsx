
import GamesCountTracker from "./GamesCountTracker"
import PlayerManagementBtns from "./PlayerManagementBtns"

function TopRowContainer() {

    return (
        <div className="active-game-top-row flex justify-between p-2 items-center h-full ">
            <PlayerManagementBtns />
            <GamesCountTracker />
        </div>
    )
}

export default TopRowContainer