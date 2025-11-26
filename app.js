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
let twoPlayers = false;

// Game history elements

const gameHistory = document.querySelector(".game-records");
const recordList = document.querySelector(".records-list");

const playerList = [];
const previousGameScores = [];
let confirmClicked = false;

const playerListContainer = document.querySelector(".player-list");

// Determine current game number
/**
 * gameNumber
 * Returns the current game number based on saved rounds.
 * If there are previously stored rounds in localStorage, the next game number
 * will be the count of rounds + 1. Otherwise returns 1 for the first game.
 * Side effects: none (pure getter from localStorage)
 */
function gameNumber() {
  const savedRounds = localStorage.getItem("allRounds");
  if (savedRounds) {
    const rounds = JSON.parse(savedRounds);
    return rounds.length + 1;
  } else {
    return 1;
  }
}

/**
 * renderPlayers
 * Render the active players into the DOM.
 * - Clears the player list container
 * - For each active player, creates a player card showing name and score
 * - Adds input + button for adding points and an Archive button
 * - Attaches handlers (addScore and archivePlayer) after rendering
 * Inputs: uses global `playerList` and DOM refs
 * Side effects: mutates DOM
 */
const renderPlayers = () => {
  playerListContainer.innerHTML = "";
  
  console.log("twoPlayers is ", twoPlayers)
 if(twoPlayers === true){
  const nameSection = document.createElement("ul");
  const scoreSection = document.createElement("li");
  nameSection.classList.add("two-player-names");
  scoreSection.classList.add("average-scores");

  
 
  playerListContainer.style.display = "flex";
   
    

      playerList.forEach((player, index) => {
    //logic for if the there are only two players
       // render player card
  
    // logic for if there are more than two players
     
    if (player.active !== false) {
      // render player card
      const playerProfile = document.createElement("li");
      playerProfile.classList.add("player-profile");
      playerProfile.innerHTML = `
        <p class="player-name">${player.name}</p>
        
        <span>
          <input  inputmode='numeric' pattern="-?[0-9]*" name="score-input" class="score-input" />
          <button data-index="${index}" class="add-points">add points</button>
        </span>
        <button data-index="${index}" class="archive-player">Archive</button>
      `;



      nameSection.appendChild(playerProfile);
    
}});
playerListContainer.appendChild(nameSection);
playerListContainer.appendChild(scoreSection);
 } else{ 
  playerList.forEach((player, index) => {
    //logic for if the there are only two players
    
    // logic for if there are more than two players
     
    if (player.active !== false) {
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
        <button data-index="${index}" class="archive-player">Archive</button>
      `;

      playerListContainer.appendChild(playerProfile);
    
}});}
  addScore();
  archivePlayer();
};
// load players
/**
 * loadPlayers
 * Load application state from localStorage into memory and the UI.
 * - Loads `allRounds` history, `previousGameScores`, saved `players`, and gameStatus
 * - Updates UI elements (player list, forms, game number and visibility)
 * - If rounds exist, show leaderboard; otherwise show placeholder text
 * Inputs: reads localStorage entries `allRounds`, `previousGameScores`, `players`, `gameStatus`
 * Side effects: updates global arrays and DOM.
 */
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
/**
 * savePlayers
 * Persist the current `playerList` into localStorage.
 * Inputs: global `playerList`
 * Side effects: writes `players` entry to localStorage
 */
const savePlayers = () => {
  localStorage.setItem("players", JSON.stringify(playerList));
};

/**
 * refresh
 * Delete current players and reset to a fresh state for a new game.
 * - Asks the user for confirmation before clearing player data
 * - Clears players, rounds and related UI elements and localStorage
 * Inputs: uses global `playerList` and DOM
 * Side effects: clears localStorage entries and DOM elements
 */
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

/*
 * confirmBtn click handler
 * When the confirm button is clicked, mark that players have been confirmed
 * and transition the UI: save players, hide the form and show lower buttons
 */
confirmBtn.addEventListener("click", () => {
  confirmClicked = true;
  if(playerList.length === 2){
    twoPlayers = true
    console.log(" there are " , `${playerList.length}`," players")
    renderPlayers();
  }else{
    console.log("there are more than 2 players")
  }

  savePlayers();
  addPlayerForm.classList.toggle("hide-btns");

  lowerBtnsRow.style.display = "flex";
  confirmBtn.style.display = "none";
  addPlayerForm.style.display = "none";
});

// animation block
/*
 * newGame click handler
 * Starts a new game session from the landing state and reveals the UI
 * - Shows the app container and player form
 * - Resets records and game status and updates the displayed game number
 */
newGame.addEventListener("click", () => {
  appContainer.style.display = "flex";
  addPlayerForm.style.display = "flex";
  recordList.innerHTML = "";
  gameHistory.innerHTML = "";
  gameEnded = false;
  // gameNumberDisplay;
  lowerBtnsRow.classList.remove("hide-btns");
  gameNumberDisplay.style.display = "block";
  refresh();
  gameNumberDisplay.textContent = `Games No: ${gameNumber()}`;
  gameNumberHolder.appendChild(gameNumberDisplay);
  newGame.style.display = "none";
  confirmBtn.style.display = "block";
});

/**
 * archivePlayer
 * Attach click listeners to player 'Archive' buttons. When clicked,
 * the target player is marked inactive (`active = false`) and the UI is re-rendered.
 * Inputs: reads `playerList` and querySelectorAll('.archive-player')
 * Side effects: mutates `playerList`, persists via savePlayers(), updates DOM
 */
function archivePlayer() {
  const archiveBtn = document.querySelectorAll(".archive-player");
  archiveBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      playerList[index].active = false;
      console.log(
        playerList[index].name,
        "is active:",
        playerList[index].active
      );
      savePlayers();
      renderPlayers();
    });
  });
}
/**
 * addScore
 * Attach click listeners to each player's "add points" button and update the
 * corresponding player's score based on the numeric input next to the button.
 * - Reads integer input (or uses 0 when empty)
 * - Updates in-memory `playerList` score and the DOM
 * - Calls savePlayers() to persist state
 */
function addScore() {
  const addPointsBtn = document.querySelectorAll(".add-points");
  const scoreInput = document.querySelectorAll(".score-input");
  if(twoPlayers === true ){
    let difference = 0;
     addPointsBtn.forEach((btn, index) => {
    btn.addEventListener("click", () => {
      const scoreToAdd = parseInt(scoreInput[index].value) || 0;

      playerList[index].score += scoreToAdd;

      scoreInput[index].value = "";
      if(playerList[0].score > playerList[1].score){
       console.log( playerList[0].name, "is leading with ", playerList[0].score)
      difference = playerList[0].score - playerList[1].score
      const scoreSection = document.querySelector(".average-scores");
      scoreSection.innerHTML = `<p class="two-player-leader">${playerList[0].name} : <span>${difference}</span>  points.</p>`
      } else{
        console.log( playerList[1].name, "is leading with ", playerList[1].score) 
        difference = playerList[1].score - playerList[0].score
        const scoreSection = document.querySelector(".average-scores");
        scoreSection.innerHTML = `<p class="two-player-leader">${playerList[1].name} : <span>${difference}</span> points.</p>`
      }
      // const scoreElement = btn.closest("li").querySelector(".score");
      // scoreElement.textContent = playerList[index].score;
      savePlayers();
    });
  });
  } else{

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
}}

/*
 * addPlayerBtn click handler
 * Adds a new player to `playerList` when the Add Player button is clicked.
 * - Prevents blank names or duplicates
 * - Inserts the new player into `playerList` and updates any existing round
 *   snapshots (allRounds) so the player appears in prior round rows with a '-'
 * Inputs: uses `playerNameInput`, `confirmClicked`, global arrays
 * Side effects: mutates playerList, allRounds, localStorage and DOM
 */
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
    playerList.push({ name: playerName, score: 0, wins: 0, active: true });
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

/*
 * lateComerBtn click handler
 * Reveal the add-player form for a late player during an ongoing session.
 */
lateComerBtn.addEventListener("click", () => {
  addPlayerForm.style.display = "flex";
  confirmBtn.style.display = "block";
  confirmClicked = false;
});

/*
 * endGameBtn click handler
 * Ends the current game session:
 * - Hides the gameplay UI and shows the new-game button
 * - Sets `gameEnded` flag and saves it
 * - Calls pickWinner(), storeRounds(), and leaderBoard() to finalize results
 */
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

/*
 * nextRoundBtn click handler
 * Finalize the current round and prepare for the next round:
 * - Picks winner and stores round results
 * - Resets all players' round scores to 0 and re-saves state
 * - Re-load UI and hide the confirm button
 */
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

/**
 * pickWinner
 * Determine the winner(s) of the current round and award a win to the
 * highest-scoring player. If there is a tie, pick a random player among the
 * tied players as the tiebreaker and award the win to them.
 * Side effects: increments `wins` for the winner and updates player objects
 */
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

/**
 * storeRounds
 * Save the current round snapshot into `previousGameScores` and append that
 * snapshot to `allRounds` history.
 * - Writes `allRounds` and `previousGameScores` to localStorage
 * Inputs: reads `playerList`
 * Side effects: updates `previousGameScores`, `allRounds`, and localStorage
 */
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

/**
 * leaderBoard
 * Render the tournaments/rounds history table in the game history section of
 * the UI. For each player it creates a row containing the player's name,
 * their score across all recorded rounds, and their number of wins.
 * Inputs: uses global `allRounds` and `playerList`
 * Side effects: mutates the DOM, adding record elements to `gameHistory`
 */
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


