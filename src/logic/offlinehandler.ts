import { proxy } from "valtio";
import { GameState } from "../interfaces/logic";
import GameLoop from "./gameloop";

export class OfflineHandler {
  public offlineState = proxy({
    tickCounter: 0,
    totalTicks: 0,
    timePerRun: [] as number[],
    running: false,
  });

  public get timeRemaning() {
    return Math.floor(
      ((this.offlineState.timePerRun.reduce((sum, value) => sum + value, 0) /
        this.offlineState.timePerRun.length) *
        (this.offlineState.totalTicks - this.offlineState.tickCounter)) /
        500
    );
  }

  public state?: GameState = undefined;

  checkOffline() {
    const ticks = this.calculateOfflineTime();
    const gameLoop = GameLoop.getInstance();

    if (ticks > 0 && !this.offlineState.running) {
      const state = JSON.parse(
        JSON.stringify(gameLoop.stateHandler.getState())
      );

      this.offlineState.totalTicks = ticks;
      this.offlineState.tickCounter = 0;
      this.offlineState.running = true;
      gameLoop.stateHandler.saveStateHistory(state);

      setTimeout(
        () =>
          this.run(ticks, gameLoop, () => {
            gameLoop.stateHandler.pushState();
            gameLoop.stateHandler.savePersistant();
            this.offlineState.running = false;
            gameLoop.start();
          }),
        0
      );
    } else if (!this.offlineState.running) {
      gameLoop.start();
    }

    return ticks;
  }

  calculateOfflineTime() {
    const gameLoop = GameLoop.getInstance();
    const state = gameLoop.stateHandler.getState();

    const tickLength = gameLoop.rulesHandler.getRuleValue("TickLength");

    const now = Date.now();
    const lastTime = state.counters.time.amount;

    const timeDiff = now - lastTime;

    const ticks = Math.floor(timeDiff / tickLength);

    return ticks;
  }

  run(ticks: number, gameLoop: GameLoop, onDone: () => void) {
    // console.time("tick");
    const time = Date.now();
    const tickPerLoop = 500;
    const ticksToRun = Math.min(ticks, tickPerLoop);
    const state = gameLoop.stateHandler.getState();
    for (let i = 0; i < ticksToRun; i++) {
      gameLoop.tick();
      this.offlineState.tickCounter++;
      state.counters.time.amount += tickPerLoop;
    }

    const remainingTicks = ticks - ticksToRun;

    gameLoop.stateHandler.updateState(state);
    gameLoop.stateHandler.savePersistant();

    // console.timeEnd("tick");

    this.offlineState.timePerRun.push((Date.now() - time) / ticksToRun);

    if (remainingTicks > 0) {
      setTimeout(() => this.run(remainingTicks, gameLoop, onDone), 0);
    } else {
      onDone();
    }
  }
}
