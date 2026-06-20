// Imports
import { Player } from "./players.js";

// DOM Query Selectors
const newGameBtn = document.querySelector(".new-game-btn");
const addPlayerBtn = document.querySelector(".add-player-btn");
const playerNameInput = document.querySelector(".player-name-input");

addPlayerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let playerName = playerNameInput.value.trim();
  let player = new Player(playerName);

  console.log(player);
});
