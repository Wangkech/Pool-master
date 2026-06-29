// Imports
import { GameEngine, Ball, Player} from "./logic.js";

// DOM Query Selectors
const newGameBtn = document.querySelector(".new-game-btn");
const addPlayerModal = document.querySelector(".add-player-modal-container");
const  playerNameContainer = document.querySelector('.players-list');

const newGameBtnSection = document.querySelector(".new-game-btn-container");
const addPlayerBtn = document.querySelector(".add-player-btn");
const playerNameInput = document.querySelector(".player-name-input");

const storedData = getFromLocal("session");
const session = new GameEngine()
// const  session=   storedData.length != 0 ? storedData : new GameEngine()

window.addEventListener("load", ()=>{
    renderPlayers();
})

// const players = [];
let players = session.players;

  playerNameContainer.innerHTML = " "

newGameBtn.addEventListener("click", () => {
  
  session.resetEverything(Ball);

  addPlayerModal.style.display = "grid";
  newGameBtnSection.style.display = "none";
  playerNameContainer.innerHTML = " "
  console.log(session.balls);

});

addPlayerBtn.addEventListener("click", (e) => {
  e.preventDefault();
  let playerName = playerNameInput.value.trim();
  playerNameInput.value = " ";
  // let newPlayer = new Player(playerName);
  session.addPlayer(playerName);

  
  renderPlayers();

  saveToLocal("session", session);
});

function renderPlayers(){
  
  const playerName = document.createElement("li");

  playerName.classList.add("player")
  
  // playerNameContainer.innerHTML = " ";

  players.forEach((player, index)=>{

    playerName.innerHTML = `
          
              <p class="player-index">${index + 1}</p>
              <p class="player-name">${player.name}</p>
            
            `
            playerNameContainer.append(playerName);
  });

  
  console.log(session);

}

function saveToLocal(key, value){
  localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocal(key){
  const data =  localStorage.getItem(key);
  return JSON.parse(data);
}