const newGame = document.querySelector(".new-game-btn");

//entering new players names variables
const addPlayerForm = document.querySelector(".add-player-form");
const appContainer = document.querySelector(".app-container");
const playerNameInput = document.querySelector(".player-name-input");
const addPlayerBtn = document.querySelector(".add-player-btn");
const lateComerBtn = document.querySelector(".late-comer");
const endGameBtn = document.querySelector(".end-game");
const nextRoundBtn = document.querySelector(".next-round");
const confirmBtn = document.querySelector(".confirm-players");

const playerList = [];
const previousGameScores = [];

const playerListContainer = document.querySelector(".player-list");

// load players

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
          <input type="number" name="score-input" class="score-input" />
          <button data-index="${index}" class="add-points">add points</button>
        </span>
      `;
    playerListContainer.appendChild(playerProfile);
  });
  // addScore();
};

const loadPlayers = () => {
  const previousGame = localStorage.getItem("previousGameScores");

  if (previousGame) {
    playerList.length = 0;
    playerList.push(...JSON.parse(previousGame));

    appContainer.classList.add("show-btns");
    newGame.classList.add("hide-btns");
    addPlayerForm.classList.add("hide-btns");
    confirmBtn.classList.add("hide-btns");
  }
  const savedPlayers = localStorage.getItem("players");
  if (savedPlayers) {
    playerList.length = 0;
    playerList.push(...JSON.parse(savedPlayers));

    appContainer.classList.add("show-btns");
    newGame.classList.add("hide-btns");
    addPlayerForm.classList.add("hide-btns");
    confirmBtn.classList.add("hide-btns");
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
      confirmClicked = false;

      playerListContainer.innerHTML = "";
      console.log(playerList);
    }
  } else {
    return;
  }
};

confirmClicked = false;

confirmBtn.addEventListener("click", () => {
  confirmClicked = true;
  console.log(confirmClicked);
  savePlayers();
  addPlayerForm.classList.toggle("hide-btns");
  confirmBtn.classList.toggle("hide-btns");
});

// animation block
newGame.addEventListener("click", () => {
  appContainer.classList.add("show-btns");
  refresh();
  newGame.classList.add("hide-btns");
  confirmBtn.classList.remove("hide-btns");
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
  playerListContainer.innerHTML = "";
  if (playerNameInput.value === "") {
    return;
  }
  if (confirmClicked === false)
    playerList.push({ name: playerNameInput.value, score: 0, wins: 0 });
  playerList.forEach((player, index) => {
    const playerProfile = document.createElement("li");
    playerProfile.classList.add("player-profile");
    playerProfile.innerHTML = `
      <li class="player-profile">
          <p class="player-name">${player.name}</p>
          <p class="score">${player.score}</p>
          <span
            ><input type="number" name="score-input" class="score-input" />
            <button data-index="${index}" class="add-points">add points</button></span
          >
        </li>
  `;
    playerListContainer.appendChild(playerProfile);
    playerNameInput.value = "";
    addScore();
    savePlayers();
  });
});

lateComerBtn.addEventListener("click", () => {
  addPlayerForm.classList.toggle("hide-btns");
  confirmBtn.classList.toggle("hide-btns");
  confirmClicked = false;
});

nextRoundBtn.addEventListener("click", () => {
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

        console.log(player.name, " has won:", player.wins, "games");
      }
    });
  } else if (winner.length > 1) {
    let luckyWinner = Math.floor(Math.random() * winner.length);

    const pickedWinner = winner[luckyWinner];

    playerList.forEach((player) => {
      if (player.name === pickedWinner.name) {
        player.wins = (player.wins || 0) + 1;
      }

      console.log(
        player.name,
        " has won the tie-breaker! They won:",
        player.wins,
        "games"
      );
    });
  }
  previousGameScores.length = 0; // clear previous snapshot

  playerList.forEach((player) => {
    previousGameScores.push({
      name: player.name,
      score: player.score, // last round score
      wins: player.wins, // cumulative wins
    });
  });

  // save previous round to localStorage
  localStorage.setItem(
    "previousGameScores",
    JSON.stringify(previousGameScores)
  );

  // reset current round scores
  playerList.sort((a, b) => b.score - a.score);

  playerList.forEach((player) => (player.score = 0));

  // save updated playerList to localStorage
  savePlayers();

  // re-render the UI
  loadPlayers();

  confirmBtn.classList.add("hide-btns");
});
