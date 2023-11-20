import MessageHandler, { MessageData } from "./messagehandler";
import StateHandler from "../state/statehandler";
import RulesHandler from "../rules/ruleshandler";
import { GameState } from "../interfaces/logic";
import { PackData, PackManager, PackMessages } from "./packmanager";
import { CostForUniqueCards } from "../interfaces/rules";

export default class GameLoop {
  private static instance: GameLoop;
  public stateHandler: StateHandler;
  public rulesHandler: RulesHandler;

  private packManager: PackManager;
  private lastTime: number;
  private tick: number;

  constructor() {
    MessageHandler.init();
    this.stateHandler = new StateHandler();
    this.rulesHandler = new RulesHandler();
    this.packManager = new PackManager(this.stateHandler, this.rulesHandler);
    this.lastTime = 0;
    this.tick = 1000;
  }

  static getInstance() {
    if (!this.instance) this.instance = new GameLoop();
    return this.instance;
  }

  start() {
    this.loop(0);
  }

  loop(now: number) {
    let state = this.stateHandler.getState();
    if (now - this.lastTime > this.tick) {
      this.packManager.handleTick();
      if (state.workskill.acquired) {
        const amount = this.rulesHandler.getRuleValue("WorkSkill");
        state.money.amount += amount;
      }
      this.lastTime = now;
    }

    const messages = MessageHandler.getandClearMessages();
    while (messages && messages.length > 0) {
      const m = messages.shift();

      if (!m) break;

      if (PackManager.messageList.includes(m.message as PackMessages)) {
        this.packManager.handleMessages(
          m.message as PackMessages,
          m.data as PackData
        );
      }

      if (m.message === "unlockskill") {
        const state = this.stateHandler.getState();
        state[
          (m.data as MessageData).skill as "autopackskill" | "workskill"
        ].acquired = true;
        this.stateHandler.updateState(state);
      }

      if (m.message === "tradecard") {
        const state = this.stateHandler.getState();
        const rule =
          this.rulesHandler.getRule<CostForUniqueCards>("CostForUniqueCards");
        let fail = "";
        const badcardCost =
          (rule.badcards * (m.data.id as number)) ** rule.increase;
        const goodcardCost =
          (rule.goodcards * (m.data.id as number)) ** rule.increase;
        const metacardCost =
          (rule.metacards * (m.data.id as number)) ** rule.increase;

        if (state.badcards.amount <= badcardCost)
          fail += "Not enough bad cards \n";
        if (state.goodcards.amount <= goodcardCost)
          fail += "Not enough good cards";
        if (state.metacards.amount <= metacardCost)
          fail += "Not enough meta cards";

        if (!fail) {
          state.uniquecards.amount++;
          state.badcards.amount = Math.floor(
            state.badcards.amount - badcardCost
          );
          state.goodcards.amount = Math.floor(
            state.goodcards.amount - goodcardCost
          );
          state.metacards.amount = Math.floor(
            state.metacards.amount - metacardCost
          );
          this.stateHandler.updateState({});
        } else {
          MessageHandler.sendClientMessage(fail);
        }
      }
    }

    state = this.stateHandler.getState();
    state = this.rulesHandler.checkActiveRules(state) as GameState;
    if (state) {
      this.stateHandler.updateState(state);
    }

    state = this.stateHandler.getState();
    if (
      state.badcards.amount === 0 &&
      state.goodcards.amount === 0 &&
      state.metacards.amount === 0 &&
      state.money.amount < this.rulesHandler.getRuleValue("PackCost")
    ) {
      MessageHandler.sendClientMessage(
        "Your aunt visits and gives you 50 money"
      );
      state.money.amount += 50;
      state = this.stateHandler.updateState(state);
    }

    window.requestAnimationFrame(this.loop.bind(this));
  }
}
