import { deepmerge } from "deepmerge-ts";
import { proxy } from "valtio";
import { mergeDeep } from "../helpers/object";
import { GameState } from "../interfaces/logic";
import { MigrationHandler } from "../logic/migrationhandler";
import { state } from "./state";

let loadedState = state;

const savedState = localStorage.getItem("idletcg.state");
if (savedState) loadedState = deepmerge(state, JSON.parse(savedState));

const handler = new MigrationHandler();
const migratedState = handler.migrate(loadedState as never);

const gameState = {
  internal: structuredClone(migratedState),
  external: proxy(structuredClone(migratedState)),
};

export default class StateHandler {
  public get gameState() {
    return gameState.external;
  }

  public set gameState(state: GameState) {
    gameState.external = state;
  }

  private stateHistory: GameState = this.gameState;

  constructor() {}

  getState(): GameState {
    return gameState.internal;
  }

  getStateHistory() {
    return this.stateHistory;
  }

  saveStateHistory(state: GameState) {
    this.stateHistory = JSON.parse(JSON.stringify(state));
  }

  updateState(state: Partial<GameState>): GameState {
    gameState.internal = { ...gameState.internal, ...state };

    return gameState.internal;
  }

  pushState() {
    // console.time("pushState");
    mergeDeep(gameState.external, gameState.internal);
    // console.timeEnd("pushState");
  }

  savePersistant() {
    localStorage.setItem("idletcg.state", JSON.stringify(gameState.external));
  }
}
