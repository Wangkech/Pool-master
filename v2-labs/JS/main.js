// Imports
import { GameEngine, Ball, Game } from "./logic.js";

// DOM Query Selectors
const newGameBtn = document.querySelector(".new-game-btn");
const newGameBtnSection = document.querySelector(".new-game-btn-container");
// *** add Player Modal DOM
const addPlayerModal = document.querySelector(".add-player-modal-container");
const playerNameContainer = document.querySelector(".players-list");
const savePlayersBtn = document.querySelector(".okay-btn");
const addPlayerBtn = document.querySelector(".add-player-btn");
const playerNameInput = document.querySelector(".player-name-input");

// *** active Game DOM
const activeGameContainer = document.querySelector(".active-game-container");
const playerCardContainer = document.querySelector(".player-card-container");
// const playerList = document.querySelector('.players-list');

// Game Inititialization
window.addEventListener("DOMContentLoaded", () => {
  const storedData = getFromLocal("session");
  console.log(storedData && storedData.players.length != 0);
  const session = new GameEngine();
  const currentGame = new Game(session);

  let currentGameNo;

  if (storedData && storedData.players.length != 0) {
    playerNameContainer.innerHTML = "";
    restoreEngine(session, storedData, renderToModal);
    getPlayers(currentGame, session);
    currentGameNo = currentGame.gameNo;

    // session.players.push(...storedData.players);
    session.allGames.push(...storedData.allGames);
    session.balls.push(...storedData.balls);
  } else {
    playerNameContainer.innerHTML = "";
    renderToModal(session);
    getPlayers(currentGame, session);
  }

  addPlayerModal.style.display = "none";
  activeGameContainer.style.display = "grid";
  renderPlayer(currentGame.players);

  // EVENT LISTENERS
  // *** New gameBTN event
  newGameBtn.addEventListener("click", () => {
    session.resetEverything(Ball);

    addPlayerModal.style.display = "non";
    newGameBtnSection.style.display = "none";
    playerNameContainer.innerHTML = " ";
    // console.log(session.balls);
  });

  // *** Add Player Event
  addPlayerBtn.addEventListener("click", (e) => {
    e.preventDefault();
    let playerName = playerNameInput.value.trim();
    session.addPlayer(playerName);

    playerNameInput.value = " ";
    renderToModal();
    saveToLocal("session", session);
  });

  // *** Save Players Btn Event
  savePlayersBtn.addEventListener("click", () => {
    saveToLocal("currentGame", currentGame);

    addPlayerModal.style.display = "none";
    activeGameContainer.style.display = "grid";
  });

  // ***** END OF EVENTS

  // Local Storage Functions
  // *** Save Data to Local
  function saveToLocal(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  // *** Fetch data from local stores
  function getFromLocal(key) {
    const data = localStorage.getItem(key);
    return JSON.parse(data);
  }

  // reconstruct GameEngine class
  function restoreEngine(engine, data, render) {
    data.players.forEach((player) => {
      let name = player.name;
      let id = player.id;
      engine.addPlayer(name, id);
      render();
    });
  }

  // reconstruct Current Game
  function restoreGame() {}

  // RENDER TO UI
  // *** Render to Add Player Modal
  function renderToModal() {
    let players = session.players;

    const playerName = document.createElement("li");
    playerName.classList.add("player-on-modal");
    const message = document.createElement("p");

    message.classList.add("add-player-message");
    message.textContent = "Added players will appear here.";

    if (session.players.length === 0) {
      playerNameContainer.append(message);
      console.log("empty");
    } else {
      players.forEach((player, index) => {
        playerName.innerHTML = `
              <p class="player-index">${index + 1}</p>
              <p class="player-name">${player.name}</p>
            `;
        playerNameContainer.append(playerName);
      });
    }
    // console.log(session.players);
  }

  function renderPlayer(players) {
    // let players = currentGame.players;
    playerCardContainer.innerHTML = "";
    players.forEach((player) => {
      let name = player.name;
      let id = player.id;
      let score = player.score;
      const playerCard = document.createElement("li");
      playerCard.classList.add("player-card");
      const playerCardTop = document.createElement("div");
      playerCardTop.classList.add("player-card-top");

      playerCardTop.innerHTML = `
       <p class="player-name">${name}</p>
        <span class="points-area">
              <p class="points">${score}</p>
              <span class="points-btns">
                  <button class="add-points-btn points-btn" data-index="${id}">
                    <img
                        src="./assets/icons/Plus.svg"
                        alt="Add-points"
                      /></button
                    ><button class="minus-points-btn points-btn">
                      <img
                        src="./assets/icons/Plus.svg"
                        alt="Deduct Points"
                      /></button
                  ></span>
                  `;
      playerCard.append(playerCardTop);
      playerCardContainer.append(playerCard);
    });
  }
});

// FETCHING PLAYERS FROM CENTER

function getPlayers(currentGame, session) {
  currentGame.getActivePlayers(session);
}
