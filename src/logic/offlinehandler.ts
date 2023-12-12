import { GameState } from "../interfaces/logic";
import GameLoop from "./gameloop";

export class OfflineHandler {
  public tickCounter: number = 0;
  public totalTicks: number = 0;

  public state?: GameState = undefined;

  calculateOfflineTime() {
    const gameLoop = GameLoop.getInstance();
    const state = JSON.parse(JSON.stringify(gameLoop.stateHandler.getState()));

    const tickLength =
      GameLoop.getInstance().rulesHandler.getRuleValue("TickLength");

    const now = Date.now();
    const lastTime = state.counters.time.amount;

    const timeDiff = now - lastTime;

    const ticks = Math.floor(timeDiff / tickLength);

    this.totalTicks = ticks;
    this.tickCounter = 0;

    gameLoop.stateHandler.saveStateHistory(state);

    this.run(ticks, gameLoop, () => {
      gameLoop.stateHandler.savePersistant();
      gameLoop.start();
    });

    return this.totalTicks;
  }

  run(ticks: number, gameLoop: GameLoop, onDone: () => void) {
    const ticksToRun = Math.min(ticks, 1000);
    const state = gameLoop.stateHandler.getState();
    for (let i = 0; i < ticksToRun; i++) {
      gameLoop.tick();
      this.tickCounter++;
      state.counters.time.amount += 1000;
    }

    gameLoop.stateHandler.updateState(state);
    gameLoop.stateHandler.savePersistant();

    if (ticks > 0) {
      setTimeout(() => this.run(ticks - 1000, gameLoop, onDone), 0);
    } else {
      onDone();
    }
  }
}
