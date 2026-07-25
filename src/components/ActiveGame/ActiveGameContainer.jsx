import ActivePlayersList from "./ActivePlayersList"
import BottomRowContainer from "./BottomRowContainer"
import TopRowContainer from "./TopRowContainer"

function ActiveGameContainer() {

    return (
        <div className="bg-(--accent-bg) h-full w-[90vw] p-4 gap-1 rounded-2xl grid grid-rows-[50px_1fr_50px]">

            <TopRowContainer />
            <ActivePlayersList />
            <BottomRowContainer />
        </div>
    )
}

export default ActiveGameContainer