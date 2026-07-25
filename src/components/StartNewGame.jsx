function StartNewGame({ handleStartNewGame }) {
    return (
        <button
            onClick={handleStartNewGame}
            className="cursor-pointer"
        > Start New Game</button>
    )
}

export default StartNewGame