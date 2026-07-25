function PlayerNameList({ players, editPlayerName, removePlayer, ref }) {
    return (
        <ul ref={ref} className="list grid h-full grid-rows-[repeat(auto,minmax(0,50px))] gap-2 scrollbar-none overflow-x-auto p-2">
            {players.map((player) => (
                <li
                    key={player.id}
                    className="grid h-[48px] w-full grid-cols-[150px_1fr_1fr] items-center justify-around"
                >
                    <p className=" break-all">{player.name}</p>
                    <button onClick={() => editPlayerName(player.id)}>edit</button>
                    <button onClick={() => removePlayer(player.id)}>del</button>
                </li>
            ))}
        </ul>
    )
}

export default PlayerNameList