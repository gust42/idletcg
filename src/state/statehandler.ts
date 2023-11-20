import { GameState } from "../interfaces/logic";
import { state } from "./state";

type Subscriber = (state: GameState) => void;

export default class StateHandler {
  private state: GameState;
  private subscribers: Subscriber[];

  constructor() {
    this.state = state;

    const savedState = localStorage.getItem("idletcg.state");
    if (savedState) this.state = { ...this.state, ...JSON.parse(savedState) };
    this.subscribers = [];
  }

  getState(): GameState {
    return { ...this.state };
  }

  updateState(state: Partial<GameState>): GameState {
    this.state = { ...this.state, ...state };
    const result = { ...this.state };
    for (const sub of this.subscribers) {
      sub(result);
    }
    this.savePersistant();
    return result;
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
