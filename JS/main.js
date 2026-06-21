// Imports
import { Player } from "./players.js";
import { Game } from "./logic.js";

// DOM Query Selectors
const newGameBtn = document.querySelector(".new-game-btn");
const addPlayerBtn = document.querySelector(".add-player-btn");
const playerNameInput = document.querySelector(".player-name-input");

newGameBtn.addEventListener("click", () => {
  console.log(new Game().getBalls());
});

addPlayerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let playerName = playerNameInput.value.trim();
  let player = new Player(playerName);

  console.log(player);
});
