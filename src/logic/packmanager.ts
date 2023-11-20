import StateHandler from "./../state/statehandler";
import RulesHandler from "./../rules/ruleshandler";
import Pack from "./pack";
import MessageHandler from "./messagehandler";

export type PackData = { amount: number };
export type PackMessages =
  | "openpack"
  | "sellbadcards"
  | "sellgoodcards"
  | "sellmetacards"
  | "autobuy";

export class PackManager {
  static messageList: PackMessages[] = [
    "openpack",
    "sellbadcards",
    "sellgoodcards",
    "sellmetacards",
    "autobuy",
  ];

  private stateHandler: StateHandler;

  private rulesHandler: RulesHandler;

  constructor(stateHandler: StateHandler, rulesHandler: RulesHandler) {
    this.stateHandler = stateHandler;
    this.rulesHandler = rulesHandler;
  }

  public handleTick() {
    const state = this.stateHandler.getState();
    if (state.skills.autopackskill.acquired) this.autoOpenPack();
  }

  public handleMessages(message: PackMessages, data: PackData) {
    switch (message) {
      case "openpack":
        this.openPack(data.amount);
        break;
      case "sellmetacards":
      case "sellgoodcards":
      case "sellbadcards":
        this.sellCards(message, data.amount);
        break;
    }
  }

  private autoOpenPack() {
    this.openPack(1, 0, false);
  }

  private openPack(amount: number, costParam?: number, logParam?: boolean) {
    const state = this.stateHandler.getState();
    const cost = costParam ?? this.rulesHandler.getRuleValue("PackCost");
    const log = logParam ?? true;
    if (cost === 0 || state.entities.money.amount >= cost * amount) {
      let badcards = 0,
        goodcards = 0,
        metacards = 0;
      for (let i = 0; i < amount; i++) {
        const pack = new Pack();

        badcards += pack.badcards;
        goodcards += pack.goodcards;
        metacards += pack.metacards;
      }

      state.entities.metacards.amount += metacards;
      state.entities.goodcards.amount += goodcards;
      state.entities.badcards.amount += badcards;
      state.entities.money.amount -= cost * amount;

      if (metacards > 0) state.entities.metacards.acquired = true;

      if (goodcards > 0) state.entities.goodcards.acquired = true;

      if (badcards > 0) state.entities.badcards.acquired = true;

      if (log)
        MessageHandler.sendClientMessage(
          `${
            amount > 1 ? "Packs" : "Pack"
          } contains ${badcards} bad cards, ${goodcards} good cards and ${metacards} meta cards `
        );

      this.stateHandler.updateState(state);
    } else {
      MessageHandler.sendClientMessage("Not enough money");
    }
  }

  private sellCards(message: string, data: number) {
    if (message === "sellbadcards") {
      const state = this.stateHandler.getState();
      if (state.entities.badcards.amount >= data) {
        state.entities.money.amount +=
          this.rulesHandler.getRuleValue("BadCardSellValue") * data;
        state.entities.badcards.amount -= data;
        this.stateHandler.updateState(state);
      }
    }

    if (message === "sellgoodcards") {
      const state = this.stateHandler.getState();
      if (state.entities.goodcards.amount >= data) {
        state.entities.money.amount +=
          this.rulesHandler.getRuleValue("GoodCardSellValue") * data;
        state.entities.goodcards.amount -= data;
        this.stateHandler.updateState(state);
      }
    }

    if (message === "sellmetacards") {
      const state = this.stateHandler.getState();
      if (state.entities.metacards.amount >= data) {
        state.entities.money.amount +=
          this.rulesHandler.getRuleValue("MetaCardSellValue") * data;
        state.entities.metacards.amount -= data as number;
        this.stateHandler.updateState(state);
      }
    }
  }
}
