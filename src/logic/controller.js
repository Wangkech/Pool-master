// import { Modes } from "./modes.js";
import { GameEngine } from "./gameEngine.js";

const engine = new GameEngine();
const modes = engine.modes;

engine.addPlayer("wangkech");
engine.addPlayer("Hothnyang");
engine.addPlayer("big");

engine.startNewSession();
engine.setSessionPlayers();
const sessionPlayers = engine.currentSession.players;
// console.log(engine.currentSession.players);

// console.log(engine.currentSession.players); //.currentRound.players);
engine.setSessionMode(modes.SINGLE);
engine.startNewRound();
console.log(sessionPlayers);

engine.endCurrentRound();
// engine.changeSessionMode(modes.ROTATION);
engine.startNewRound();
engine.endCurrentRound();
engine.endCurrentSession();
// engine.sessions[0].isEnded = false;

console.log(engine.sessions[0]);

// console.log(engine);
