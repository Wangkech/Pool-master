// Imports
import { GameEngine, Ball, Game } from "./logic.js";

// DOM Query Selectors
const newGameBtn = document.querySelector(".new-game-btn");
const addPlayerModal = document.querySelector(".add-player-modal-container");
const playerNameContainer = document.querySelector(".players-list");
const savePlayersBtn = document.querySelector(".okay-btn");
const newGameBtnSection = document.querySelector(".new-game-btn-container");
const addPlayerBtn = document.querySelector(".add-player-btn");
const playerNameInput = document.querySelector(".player-name-input");

// Game Inititialization
window.addEventListener("DOMContentLoaded", () => {
  {
    const storedData = getFromLocal("session");
    console.log(storedData && storedData.players.length != 0);
    const session = new GameEngine();

    if (storedData && storedData.players.length != 0) {
      restoreEngine(session, storedData, renderPlayers);
      // session.players.push(...storedData.players);
      session.allGames.push(...storedData.allGames);
      session.balls.push(...storedData.balls);
    } else {
      renderPlayers(session);
    }

    function renderPlayers() {
      let players = session.players;
      playerNameContainer.innerHTML = " ";

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
    // EVENT LISTENERS
    // *** New gameBTN event
    newGameBtn.addEventListener("click", () => {
      session.resetEverything(Ball);

      addPlayerModal.style.display = "grid";
      newGameBtnSection.style.display = "none";
      playerNameContainer.innerHTML = " ";
      // console.log(session.balls);
    });

    // *** Add Player Event
    addPlayerBtn.addEventListener("click", (e) => {
      e.preventDefault();
      let playerName = playerNameInput.value.trim();
      playerNameInput.value = " ";
      // let newPlayer = new Player(playerName);
      session.addPlayer(playerName);

      renderPlayers();

      saveToLocal("session", session);
    });

    // *** Save Players Btn Event
    savePlayersBtn.addEventListener("click", () => {
      const currentGame = new Game(session);
      currentGame.getPlayers(session);
      if (session.balls.length === 0) {
        session.initBalls(Ball);
      }
      // console.log(currentGame.players);
      // console(session.balls.length);
      saveToLocal("currentGame", currentGame);
      // console.log(session.players);
    });

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
        engine.addPlayer(name);
        render();
      });
    }

    // reconstruct Current Game
    function restoreGame() {}
  }
});
