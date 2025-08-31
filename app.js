const newGame = document.querySelector(".new-game-btn");

// Player input elements and variables
const addPlayerForm = document.querySelector(".add-player-form");
const appContainer = document.querySelector(".app-container");
const playerNameInput = document.querySelector(".player-name-input");
const noRecords = document.createElement("p");
const addPlayerBtn = document.querySelector(".add-player-btn");
const lateComerBtn = document.querySelector(".late-comer");
const endGameBtn = document.querySelector(".end-game");
const nextRoundBtn = document.querySelector(".next-round");
const confirmBtn = document.querySelector(".confirm-players");
const lowerBtnsRow = document.querySelector(".lower-btns");
lowerBtnsRow.style.display = "none";
const gameNumberHolder = document.querySelector(".after-title");
const gameNumberDisplay = document.createElement("p");
gameNumberDisplay.style.display = "none";
const allRounds = [];
let gameEnded = false;

const gameHistory = document.querySelector(".game-records");
const recordList = document.querySelector(".records-list");

const playerList = [];
const previousGameScores = [];
let confirmClicked = false;

const playerListContainer = document.querySelector(".player-list");

// Determine current game number
function gameNumber() {
  const savedRounds = localStorage.getItem("allRounds");
  if (savedRounds) {
    const rounds = JSON.parse(savedRounds);
    return rounds.length + 1;
  } else {
    return 1;
  }
}

const renderPlayers = () => {
  playerListContainer.innerHTML = "";

  playerList.forEach((player, index) => {
    // render player card
    const playerProfile = document.createElement("li");
    playerProfile.classList.add("player-profile");
    playerProfile.innerHTML = `
        <p class="player-name">${player.name}</p>
        <p class="score">${player.score}</p>
        <span>
          <input  inputmode='numeric' pattern="-?[0-9]*" name="score-input" class="score-input" />
          <button data-index="${index}" class="add-points">add points</button>
        </span>
      `;

    playerListContainer.appendChild(playerProfile);
  });
  addScore();
};
// load players
const loadPlayers = () => {
  // // load all rounds history
  const savedRounds = localStorage.getItem("allRounds");
  if (savedRounds) {
    allRounds.length = 0;
    allRounds.push(...JSON.parse(savedRounds));
  }
  // load previous game scores
  const previousGame = localStorage.getItem("previousGameScores");

  if (previousGame) {
    playerList.length = 0;
    playerList.push(...JSON.parse(previousGame));

    appContainer.classList.add("show-btns");
    // newGame.classList.add("hide-btns");
    addPlayerForm.classList.add("hide-btns");
    confirmBtn.classList.add("hide-btns");
  }
  const savedPlayers = localStorage.getItem("players");
  if (savedPlayers) {
    playerList.length = 0;
    playerList.push(...JSON.parse(savedPlayers));

    appContainer.classList.add("show-btns");
    newGame.classList.add("hide-btns");
    addPlayerForm.style.display = "none";
    confirmBtn.style.display = "none";
    lowerBtnsRow.style.display = "none";

    gameNumberDisplay.textContent = `Game No: ${gameNumber()}`;
    gameNumberHolder.appendChild(gameNumberDisplay);
    gameNumberDisplay.style.display = "block";
    lowerBtnsRow.style.display = "flex";
  }
  const gameStatus = localStorage.getItem("gameStatus");
  if (gameStatus) {
    gameEnded = JSON.parse(gameStatus);
  }
  console.log("The game ended", gameEnded);
  if (gameEnded === true) {
    appContainer.style.display = "none";
    lowerBtnsRow.style.display = "none";
    newGame.style.display = "block";
    gameNumberDisplay.textContent = `Games Played: ${gameNumber() - 1}`;
  }
  if (allRounds.length !== 0) {
    leaderBoard();

    // gameHistory.removeChild(noRecords);
  } else {
    noRecords.textContent = "No game records yet.";
    gameHistory.appendChild(noRecords);
    // gameHistory.innerHTML = "";
  }
  renderPlayers();
};

loadPlayers();
// save players names and scores
const savePlayers = () => {
  localStorage.setItem("players", JSON.stringify(playerList));
};

//delete players and start new game
const refresh = () => {
  if (playerList.length !== 0) {
    const askUser = confirm(
      "Are you sure you want to start a new game? All players and scores will be deleted."
    );

    if (askUser === true) {
      playerList.length = 0;
      localStorage.removeItem("players");
      localStorage.removeItem("previousGameScores");
      localStorage.removeItem("allRounds");
      allRounds.length = 0;
      confirmClicked = false;
      playerListContainer.innerHTML = "";
      recordList.innerHTML = "";
      gameHistory.innerHTML = "";
      noRecords.textContent = "No game records yet.";
      gameHistory.appendChild(noRecords);
      addPlayerForm.style.display = "flex";

      // localStorage.removeItem('players')
    }
  } else {
    return;
  }
};

confirmBtn.addEventListener("click", () => {
  confirmClicked = true;
  console.log(confirmClicked);
  savePlayers();
  addPlayerForm.classList.toggle("hide-btns");

  lowerBtnsRow.style.display = "flex";
  confirmBtn.style.display = "none";
  addPlayerForm.style.display = "none";
});

// animation block
newGame.addEventListener("click", () => {
  appContainer.style.display = "flex";
  addPlayerForm.style.display = "flex";
  recordList.innerHTML = "";
  gameHistory.innerHTML = "";
  // gameNumberDisplay;
  lowerBtnsRow.classList.remove("hide-btns");
  gameNumberDisplay.style.display = "block";

  gameNumberDisplay.textContent = `Games No: ${gameNumber() + 1}`;
  gameNumberHolder.appendChild(gameNumberDisplay);
  newGame.style.display = "none";
  confirmBtn.style.display = "block";
  gameEnded = false;

  refresh();
});

// adding points mechanism
function addScore() {
  const addPointsBtn = document.querySelectorAll(".add-points");
  const scoreInput = document.querySelectorAll(".score-input");

  addPointsBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const scoreToAdd = parseInt(scoreInput[index].value) || 0;

      playerList[index].score += scoreToAdd;

      scoreInput[index].value = "";

      const scoreElement = btn.closest("li").querySelector(".score");
      scoreElement.textContent = playerList[index].score;
      savePlayers();
    });
  });
}

// adding players mechanism
addPlayerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  gameEnded = false;
  localStorage.setItem("gameStatus", JSON.stringify(gameEnded));
  const playerName = playerNameInput.value.trim();
  if (playerName === "") {
    return;
  }
  if (confirmClicked === false) {
    const playerExists = playerList.some(
      (player) => player.name.toLowerCase() === playerName.toLowerCase()
    );
    if (playerList.length !== 0) {
      if (playerExists) {
        alert("This player has already been added.");
        return;
      }
    }
    // Add new player
    playerList.push({ name: playerName, score: 0, wins: 0 });
    if (allRounds.length > 0) {
      allRounds.forEach((round) => {
        round.push({ name: playerName, score: "-", wins: 0 });
      });
    }
    savePlayers();
    renderPlayers();
  }
  playerNameInput.value = "";
  lowerBtnsRow.style.display = "flex";
  gameNumberDisplay.style.display = "block";
});

lateComerBtn.addEventListener("click", () => {
  addPlayerForm.style.display = "flex";
  confirmBtn.style.display = "block";
  confirmClicked = false;
});

endGameBtn.addEventListener("click", () => {
  appContainer.style.display = "none";
  addPlayerForm.style.display = "none";
  newGame.style.display = "block";
  lowerBtnsRow.style.display = "none";
  gameNumberDisplay.style.display = "block";
  gameNumberDisplay.textContent = `Games Played: ${gameNumber()}`;
  gameNumberHolder.appendChild(gameNumberDisplay);
  gameEnded = true;
  localStorage.setItem("gameStatus", JSON.stringify(gameEnded));

  console.log("The game ended", gameEnded);

  pickWinner();
  storeRounds();
  leaderBoard();
});

nextRoundBtn.addEventListener("click", () => {
  pickWinner();
  storeRounds();
  leaderBoard();
  // reset current round scores
  playerList.sort((a, b) => b.score - a.score);

  playerList.forEach((player) => (player.score = 0));
  console.log(allRounds);
  // save updated playerList to localStorage
  savePlayers();

  // re-render the UI
  gameEnded = false;
  loadPlayers();

  confirmBtn.classList.add("hide-btns");
});

function pickWinner() {
  let highest = Math.max(...playerList.map((p) => p.score));
  const winner = [];
  playerList.forEach((player) => {
    if (player.score === highest) {
      winner.push(player);
    }
  });

  if (winner.length === 1) {
    playerList.forEach((player) => {
      if (player.score === highest) {
        player.wins = (player.wins || 0) + 1;

        // console.log(player.name, " has won:", player.wins, "games");
      }
    });
  } else if (winner.length > 1) {
    let luckyWinner = Math.floor(Math.random() * winner.length);

    const pickedWinner = winner[luckyWinner];
    alert(pickedWinner.name + " has won the tie-breaker!");
    playerList.forEach((player) => {
      if (player.name === pickedWinner.name) {
        player.wins = (player.wins || 0) + 1;
      }
    });
  }
}

function storeRounds() {
  previousGameScores.length = 0; // clear previous snapshot

  playerList.forEach((player) => {
    previousGameScores.push({
      name: player.name,
      score: player.score, // last round score
      wins: player.wins, // cumulative wins
    });
  });
  // store all rounds history
  allRounds.push([...previousGameScores]);
  localStorage.setItem("allRounds", JSON.stringify(allRounds));

  // console.log("All rounds history:", allRounds);

  // save previous round to localStorage
  localStorage.setItem(
    "previousGameScores",
    JSON.stringify(previousGameScores)
  );
}

function leaderBoard() {
  gameHistory.innerHTML = ""; // clear old board first
  document.documentElement.style.setProperty("--rounds", allRounds.length);

  // ----- Build Header -----
  const fields = document.createElement("div");
  fields.classList.add("record-fields");

  const nameField = document.createElement("p");
  nameField.classList.add("record-name");
  nameField.textContent = "Name";
  fields.appendChild(nameField);

  // Add Game 1 → Game N
  for (let games = 0; games < allRounds.length; games++) {
    const gameField = document.createElement("p");
    gameField.classList.add("record-score");
    gameField.textContent = `Game ${games + 1}`;
    fields.appendChild(gameField);
  }

  const winsField = document.createElement("p");
  winsField.classList.add("record-wins");
  winsField.textContent = "Wins";
  fields.appendChild(winsField);

  gameHistory.appendChild(fields);

  // ----- Build Player Records -----

  recordList.innerHTML = "";

  if (allRounds.length === 0) return; // no games yet

  // Loop players from first round (same order every round)
  playerList.forEach((player) => {
    const record = document.createElement("li");
    record.classList.add("record");

    // player name
    const playerName = document.createElement("p");
    playerName.classList.add("record-name");
    playerName.textContent = player.name;
    record.appendChild(playerName);

    // player scores across all rounds
    for (let i = 0; i < allRounds.length; i++) {
      const round = allRounds[i];
      // Find the player by name in this round
      const roundPlayer = round.find((p) => p.name === player.name);
      const playerScore = document.createElement("p");
      playerScore.classList.add("record-score");
      playerScore.textContent = roundPlayer ? roundPlayer.score : "-";
      record.appendChild(playerScore);
    }

    // player wins (from latest round snapshot)
    const playerWins = document.createElement("p");
    const lastRoundPlayer = allRounds[allRounds.length - 1].find(
      (p) => p.name === player.name
    );
    playerWins.classList.add("record-wins");
    playerWins.textContent = lastRoundPlayer ? lastRoundPlayer.wins : "0";
    record.appendChild(playerWins);
    recordList.appendChild(record);
  });
  gameHistory.appendChild(recordList);
  // renderRecords();
}
