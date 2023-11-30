import GameLoop from "./gameloop";

export class OfflineHandler {
  public tickCounter: number = 0;
  public totalTicks: number = 0;

  calculateOfflineTime() {
    const gameLoop = GameLoop.getInstance();
    let state = gameLoop.stateHandler.getState();

    const tickLength =
      GameLoop.getInstance().rulesHandler.getRuleValue("TickLength");

    const now = Date.now();
    const lastTime = state.counters.time.amount;

    const timeDiff = now - lastTime;

    const ticks = Math.floor(timeDiff / tickLength);

    this.totalTicks = ticks;
    this.tickCounter = 0;

    gameLoop.stateHandler.saveStateHistory(state);

    const history = gameLoop.stateHandler.getStateHistory();

    if (ticks < 500000)
      for (let i = 0; i < ticks; i++) {
        state = gameLoop.tick(state);
        this.tickCounter++;
      }

    gameLoop.stateHandler.updateState(state);

    gameLoop.start();

    return [state, history] as const;
  }
}
