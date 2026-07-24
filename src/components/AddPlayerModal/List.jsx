function List({ players }) {
  return (
    <div className="list-container">
      <ul className="list flex flex-col gap-2 p-2">
        {players.map((player) => (
          <li
            key={player.id}
            className="grid h-12 w-full grid-cols-[150px_1fr_1fr] items-center justify-around"
          >
            <p className="max-w-full break-all">{player.name}</p>
            <button>edit</button>
            <button>del</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
