import { GameState } from "../interfaces/logic";
import { MigrationHandler } from "../logic/migrationhandler";
import { state } from "./state";

type Subscriber = (state: GameState) => void;

export default class StateHandler {
  private state: GameState;
  private subscribers: Subscriber[];

  constructor() {
    const handler = new MigrationHandler();

    let loadedState = state;

    const savedState = localStorage.getItem("idletcg.state");
    if (savedState) loadedState = { ...state, ...JSON.parse(savedState) };
    this.state = handler.migrate(loadedState as never);
    this.savePersistant();
    this.subscribers = [];
  }

  getState(): GameState {
    return { ...this.state };
  }

  notify() {
    const result = { ...this.state };
    for (const sub of this.subscribers) {
      sub(result);
    }
  }

  setState(state: GameState): GameState {
    this.state = state;
    this.notify();
    this.savePersistant();
    return { ...this.state };
  }

  updateState(state: Partial<GameState>): GameState {
    this.state = { ...this.state, ...state };
    this.notify();
    this.savePersistant();
    return { ...this.state };
  }

  savePersistant() {
    localStorage.setItem("idletcg.state", JSON.stringify(this.state));
  }

  subscribe(callback: Subscriber) {
    this.subscribers.push(callback);
  }

  unsubscribe(callback: Subscriber) {
    const index = this.subscribers.findIndex((c) => c === callback);
    this.subscribers.splice(index, 1);
  }
}
