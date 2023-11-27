import { proxy } from "valtio";
import { GameState } from "../interfaces/logic";
import { MigrationHandler } from "../logic/migrationhandler";
import { state } from "./state";

let loadedState = state;

const savedState = localStorage.getItem("idletcg.state");
if (savedState) loadedState = { ...state, ...JSON.parse(savedState) };

const handler = new MigrationHandler();
const migratedState = handler.migrate(loadedState as never);

export let gameState = proxy(migratedState);

export default class StateHandler {
  constructor() {}

  getState(): GameState {
    return { ...gameState };
  }

  updateState(state: Partial<GameState>): GameState {
    gameState = proxy({ ...gameState, ...state });
    this.savePersistant();
    return gameState;
  }

  savePersistant() {
    localStorage.setItem("idletcg.state", JSON.stringify(gameState));
  }
}
