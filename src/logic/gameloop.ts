import MessageHandler, { GenericMessage, SkillMessage } from "./messagehandler";
import StateHandler from "../state/statehandler";
import RulesHandler from "../rules/ruleshandler";
import { GameState } from "../interfaces/logic";
import { PackData, PackManager, PackMessages } from "./packmanager";
import { CostForUniqueCards, SkillRule } from "../interfaces/rules";

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
      if (state.skills.workSkill.acquired) {
        const amount = this.rulesHandler.getRuleValue("workSkill");
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
        const data = m.data as SkillMessage;
        const state = this.stateHandler.getState();
        const rule = this.rulesHandler.getRule<SkillRule>(data.name);

        if (state.entities.money.amount >= rule.requirement) {
          state.skills[data.name].acquired = true;
          state.entities.money.amount -= rule.requirement;
          this.stateHandler.updateState(state);
        } else {
          MessageHandler.sendClientMessage("Not enough money");
        }
      }

      if (m.message === "levelupskill") {
        const data = m.data as SkillMessage;
        const state = this.stateHandler.getState();
        const rule = this.rulesHandler.getRule<SkillRule>(data.name);

        console.log(state.skills[data.name].level);
        if (
          state.entities.money.amount >=
          rule.requirement ** rule.increase * state.skills[data.name].level
        ) {
          state.skills[data.name].level += 1;
          state.entities.money.amount -=
            rule.requirement ** rule.increase * state.skills[data.name].level;
          this.stateHandler.updateState(state);
        } else {
          MessageHandler.sendClientMessage("Not enough money");
        }
      }

      if (m.message === "tradecard") {
        const data = m.data as GenericMessage;
        const state = this.stateHandler.getState();
        const rule =
          this.rulesHandler.getRule<CostForUniqueCards>("CostForUniqueCards");
        let fail = "";
        const badcardCost =
          (rule.badcards * (data.id as number)) ** rule.increase;
        const goodcardCost =
          (rule.goodcards * (data.id as number)) ** rule.increase;
        const metacardCost =
          (rule.metacards * (data.id as number)) ** rule.increase;

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
