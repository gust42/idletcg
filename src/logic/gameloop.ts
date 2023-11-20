import MessageHandler from "./messagehandler";
import StateHandler from "../state/statehandler";
import Pack from "./pack";
import RulesHandler from "../rules/ruleshandler";
import { GameState, Skill } from "../interfaces/logic";

export default class GameLoop {
  private static instance: GameLoop;
  public stateHandler: StateHandler;
  public rulesHandler: RulesHandler;
  private lastTime: number;
  private tick: number;

  constructor() {
    MessageHandler.init();
    this.stateHandler = new StateHandler();
    this.rulesHandler = new RulesHandler();
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
      if (state.autopackskill.acquired)
        MessageHandler.recieveMessage("openpack", {
          amount: 1,
          cost: 0,
          log: false,
        });
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
      if (m.message === "openpack") {
        const state = this.stateHandler.getState();
        let amount = m.data;
        let cost = this.rulesHandler.getRuleValue("PackCost");
        let log = true;
        if (typeof m.data === "object")
          ({ amount, cost, log } = m.data as {
            amount: number;
            cost: number;
            log: boolean;
          });
        if (state.money.amount >= cost * (amount as number)) {
          let badcards = 0,
            goodcards = 0,
            metacards = 0;
          for (let i = 0; i < (amount as number); i++) {
            const pack = new Pack();

            badcards += pack.badcards;
            goodcards += pack.goodcards;
            metacards += pack.metacards;
          }

          state.metacards.amount += metacards;
          state.goodcards.amount += goodcards;
          state.badcards.amount += badcards;
          state.money.amount -= cost * (amount as number);

          if (metacards > 0) state.metacards.acquired = true;

          if (goodcards > 0) state.goodcards.acquired = true;

          if (badcards > 0) state.badcards.acquired = true;

          if (log)
            MessageHandler.sendClientMessage(
              `${
                (amount as number) > 1 ? "Packs" : "Pack"
              } contains ${badcards} bad cards, ${goodcards} good cards and ${metacards} meta cards `
            );

          this.stateHandler.updateState(state);
        } else {
          MessageHandler.sendClientMessage("Not enough money");
        }
      }

      if (m.message === "sellbadcards") {
        const state = this.stateHandler.getState();
        if (state.badcards.amount >= (m.data as number)) {
          state.money.amount +=
            this.rulesHandler.getRuleValue("BadCardSellValue") *
            (m.data as number);
          state.badcards.amount -= m.data as number;
          this.stateHandler.updateState(state);
        }
      }

      if (m.message === "sellgoodcards") {
        const state = this.stateHandler.getState();
        if (state.goodcards.amount >= (m.data as number)) {
          state.money.amount +=
            this.rulesHandler.getRuleValue("GoodCardSellValue") *
            (m.data as number);
          state.goodcards.amount -= m.data as number;
          this.stateHandler.updateState(state);
        }
      }

      if (m.message === "sellmetacards") {
        const state = this.stateHandler.getState();
        if (state.metacards.amount >= (m.data as number)) {
          state.money.amount +=
            this.rulesHandler.getRuleValue("MetaCardSellValue") *
            (m.data as number);
          state.metacards.amount -= m.data as number;
          this.stateHandler.updateState(state);
        }
      }

      if (m.message === "unlockskill") {
        const state = this.stateHandler.getState();
        (state[m.data as unknown as keyof GameState] as Skill).acquired = true;
        this.stateHandler.updateState(state);
      }

      if (m.message === "tradecard") {
        const state = this.stateHandler.getState();
        const rule = this.rulesHandler.getRule("CostForUniqueCards");
        let fail = "";
        const badcardCost =
          (rule.first.badcards * (m.data as number)) ** rule.increase;
        const goodcardCost =
          (rule.first.goodcards * (m.data as number)) ** rule.increase;
        const metacardCost =
          (rule.first.metacards * (m.data as number)) ** rule.increase;

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
