export class TimerHandler {
  private static instance: TimerHandler;

  private timers: (() => void)[] = [];

  static getInstance() {
    if (!this.instance) this.instance = new TimerHandler();
    return this.instance;
  }

  setTimer(callback: () => void) {
    return this.timers.push(callback) - 1;
  }

  removeTimer(id: number) {
    this.timers.splice(id, 1);
  }

  run() {
    console.log("running timers");
    this.timers.forEach((timer) => timer());
  }
}
