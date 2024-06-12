export class TimerHandler {
  private static instance: TimerHandler;

  private timers: Map<number, () => void> = new Map();
  private nextId: number = 0;

  static getInstance() {
    if (!this.instance) this.instance = new TimerHandler();
    return this.instance;
  }

  setTimer(callback: () => void) {
    const id = this.nextId++;
    this.timers.set(id, callback);
    return id;
  }

  removeTimer(id: number) {
    this.timers.delete(id);
  }

  run() {
    this.timers.forEach((timer) => timer());
  }
}
