// import { Modes } from "./modes.js";
import { GameEngine } from "./gameEngine.js";

const engine = new GameEngine();
const modes = engine.modes;

engine.addPlayer("wangkech");
engine.addPlayer("Hothnyang");
engine.addPlayer("big");

engine.startNewSession();
engine.setSessionPlayers();

engine.setSessionMode(modes.SINGLE);
engine.startNewRound();

console.log(engine.currentSession.currentRound.players);
engine.endCurrentRound();

engine.startNewRound();
engine.endCurrentRound();
engine.endCurrentSession();

console.log(engine.sessions[0]);
