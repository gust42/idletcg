import MessageHandler, { MessageData } from "./messagehandler";
import StateHandler from "../state/statehandler";
import RulesHandler from "../rules/ruleshandler";
import { GameState } from "../interfaces/logic";
import { PackData, PackManager, PackMessages } from "./packmanager";
import { CostForUniqueCards, Rules } from "../interfaces/rules";

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
      if (state.skills.workskill.acquired) {
        const amount = this.rulesHandler.getRuleValue("WorkSkill");
        state.entities.money.amount += amount;
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
        const rule = this.rulesHandler.getRule(
          (m.data as MessageData).name as keyof Rules
        );

        if (state.entities.money.amount >= (rule.requirement as number)) {
          state.skills[
            (m.data as MessageData).name as "autopackskill" | "workskill"
          ].acquired = true;
          state.entities.money.amount -= rule.requirement as number;
          this.stateHandler.updateState(state);
        } else {
          MessageHandler.sendClientMessage("Not enough money");
        }
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

        if (state.entities.badcards.amount <= badcardCost)
          fail += "Not enough bad cards \n";
        if (state.entities.goodcards.amount <= goodcardCost)
          fail += "Not enough good cards";
        if (state.entities.metacards.amount <= metacardCost)
          fail += "Not enough meta cards";

        if (!fail) {
          state.counters.uniquecards.amount++;
          state.entities.badcards.amount = Math.floor(
            state.entities.badcards.amount - badcardCost
          );
          state.entities.goodcards.amount = Math.floor(
            state.entities.goodcards.amount - goodcardCost
          );
          state.entities.metacards.amount = Math.floor(
            state.entities.metacards.amount - metacardCost
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
      state.entities.badcards.amount === 0 &&
      state.entities.goodcards.amount === 0 &&
      state.entities.metacards.amount === 0 &&
      state.entities.money.amount < this.rulesHandler.getRuleValue("PackCost")
    ) {
      MessageHandler.sendClientMessage(
        "Your aunt visits and gives you 50 money"
      );
      state.entities.money.amount += 50;
      state = this.stateHandler.updateState(state);
    }

    window.requestAnimationFrame(this.loop.bind(this));
  }
}
