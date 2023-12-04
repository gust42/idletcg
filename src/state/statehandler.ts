import { deepmerge } from "deepmerge-ts";
import { proxy } from "valtio";
import { GameState } from "../interfaces/logic";
import { MigrationHandler } from "../logic/migrationhandler";
import { state } from "./state";

let loadedState = state;

const savedState = localStorage.getItem("idletcg.state");
if (savedState) loadedState = deepmerge(state, JSON.parse(savedState));

const handler = new MigrationHandler();
const migratedState = handler.migrate(loadedState as never);

const gameState = proxy(migratedState);
export default class StateHandler {
  private _gameState: GameState = gameState;

  public get gameState() {
    return this._gameState;
  }

  public set gameState(state: GameState) {
    this._gameState = state;
  }

  private stateHistory: GameState = this.gameState;

  constructor() {}

  getState(): GameState {
    return { ...this.gameState };
  }

  getStateHistory() {
    return this.stateHistory;
  }

  saveStateHistory(state: GameState) {
    this.stateHistory = JSON.parse(JSON.stringify(state));
  }

  updateState(state: Partial<GameState>): GameState {
    this.gameState = proxy({ ...gameState, ...state });
    return this.gameState;
  }

  savePersistant() {
    localStorage.setItem("idletcg.state", JSON.stringify(this.gameState));
  }
}
