import { GameState } from "../interfaces/logic";
import RulesHandler, { AllSkills } from "./../rules/ruleshandler";
import StateHandler from "./../state/statehandler";
import { calculatePackUpgradeCost } from "./helpers";
import MessageHandler from "./messagehandler";
import Pack from "./pack";

export type PackData = { amount: number };

export type PackUpgradeData = { skill: keyof GameState["pack"] };

export type PackMessages =
  | "openpack"
  | "sellbadcards"
  | "sellgoodcards"
  | "sellmetacards"
  | "upgradeamount"
  | "unlockgood"
  | "unlockmeta"
  | "upgrade"
  | "autobuy";

export class PackManager {
  static messageList: PackMessages[] = [
    "openpack",
    "sellbadcards",
    "sellgoodcards",
    "sellmetacards",
    "upgradeamount",
    "unlockgood",
    "unlockmeta",
    "upgrade",
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
    if (state.skills.autoPackSkill.acquired)
      this.autoOpenPack(state.skills.autoPackSkill.level);

    const amount = this.rulesHandler.getRuleValue("PackSupplyTick");
    state.entities.packsupply.amount += amount + state.pack.supply.amount * 2;
  }

  public handleMessages(
    message: PackMessages,
    data: PackData | PackUpgradeData
  ) {
    const messageData = data as PackData;
    switch (message) {
      case "openpack":
        this.openPack(messageData.amount);
        break;
      case "sellmetacards":
      case "sellgoodcards":
      case "sellbadcards":
        this.sellCards(message, messageData.amount);
        break;
      case "upgrade":
        this.upgrade(data as PackUpgradeData);
        break;
      case "upgradeamount":
        this.upgradeAmount();
        break;
      case "unlockgood":
        this.unlockGood();
        break;
      case "unlockmeta":
        this.unlockMeta();
        break;
    }
  }

  private getUpgradeCost(skill: keyof GameState["pack"], level: number) {
    if (skill === "amount" || skill === "supply")
      return calculatePackUpgradeCost(level);
    if (skill === "good") return this.rulesHandler.getRuleValue("GoodUnlock");
    if (skill === "meta") return this.rulesHandler.getRuleValue("MetaUnlock");

    return 0;
  }

  private upgrade(data: PackUpgradeData) {
    const state = this.stateHandler.getState();
    const cost = this.getUpgradeCost(data.skill, state.pack[data.skill].amount);
    if (state.entities.packbonuspoints.amount >= cost) {
      state.pack[data.skill].amount += 1;
      state.entities.packbonuspoints.amount -= cost;
      this.stateHandler.updateState(state);
    }
  }

  private upgradeAmount() {
    const state = this.stateHandler.getState();
    const cost = calculatePackUpgradeCost(state.pack.amount.amount);
    if (state.entities.packbonuspoints.amount >= cost) {
      state.pack.amount.amount += 1;
      state.entities.packbonuspoints.amount -= cost;
      this.stateHandler.updateState(state);
    }
  }

  private unlockGood() {
    const state = this.stateHandler.getState();
    const rule = this.rulesHandler.getRuleValue("GoodUnlock");
    if (state.entities.packbonuspoints.amount >= rule) {
      state.pack.good.amount = 1;
      state.entities.packbonuspoints.amount -= rule;
      this.stateHandler.updateState(state);
    }
  }

  private unlockMeta() {
    const state = this.stateHandler.getState();
    const rule = this.rulesHandler.getRuleValue("MetaUnlock");
    if (state.entities.packbonuspoints.amount >= rule) {
      state.pack.meta.amount = 1;
      state.entities.packbonuspoints.amount -= rule;
      this.stateHandler.updateState(state);
    }
  }

  private autoOpenPack(level: number) {
    const state = this.stateHandler.getState();
    const skill = AllSkills.autoPackSkill;
    if (state.skills.autoPackSkill.on)
      this.openPack(skill.effect(level), false);
  }

  private calculatePackCost() {
    const state = this.stateHandler.getState();

    const cost = this.rulesHandler.getRuleValue("PackCost");
    if (!state.skills.shopkeeperFriendSkill.acquired) return cost;

    const costSkill = AllSkills.shopkeeperFriendSkill;

    return cost * costSkill.effect(state.skills.shopkeeperFriendSkill.level);
  }

  private openPack(amount: number, logParam?: boolean) {
    const state = this.stateHandler.getState();
    const log = logParam ?? true;

    const cost = this.calculatePackCost();

    if (
      state.entities.money.amount >= cost * amount &&
      amount <= state.entities.packsupply.amount
    ) {
      let badcards = 0,
        goodcards = 0,
        metacards = 0;

      const metaCardDropRate =
        this.rulesHandler.getRuleValue("MetaCardDroprate");
      const goodCardDropRate =
        this.rulesHandler.getRuleValue("GoodCardDroprate");
      const goodCardPackMax = this.rulesHandler.getRuleValue("GoodCardPackMax");
      const cardsInPack = this.rulesHandler.getRuleValue("CardsInPack");

      for (let i = 0; i < amount; i++) {
        const pack = new Pack(
          metaCardDropRate,
          goodCardDropRate,
          goodCardPackMax,
          cardsInPack
        );

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

      if (!state.entities.packbonuspoints.acquired)
        state.entities.packbonuspoints.acquired = true;

      state.entities.packbonuspoints.amount += 1 * amount;

      state.entities.packsupply.amount -= amount;

      if (log)
        MessageHandler.sendClientMessage(
          `${
            amount > 1 ? "Packs" : "Pack"
          } contains ${badcards} bad cards, ${goodcards} good cards and ${metacards} meta cards `
        );

      this.stateHandler.updateState(state);
    } else if (log) {
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
