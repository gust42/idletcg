import { GameState } from "../interfaces/logic";
import RulesHandler, { AllSkills } from "./../rules/ruleshandler";
import StateHandler from "./../state/statehandler";
import { calculatePackSupplyIncome, calculatePackUpgradeCost } from "./helpers";
import MessageHandler from "./messagehandler";
import { openPack, openPacks } from "./pack";

export type PackType = "normal" | "free" | "express";

export type PackData = { amount: number; type: PackType };

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

    const packSupply = calculatePackSupplyIncome(state);

    state.entities.packsupply.amount += packSupply;
  }

  public handleMessages(
    message: PackMessages,
    data: PackData | PackUpgradeData
  ) {
    const messageData = data as PackData;
    switch (message) {
      case "openpack":
        this.openPack(messageData.amount, messageData.type);
        break;
      case "sellmetacards":
      case "sellgoodcards":
      case "sellbadcards":
        this.sellCards(message, messageData.amount);
        break;
      case "upgrade":
        this.upgrade(data as PackUpgradeData);
        break;
    }
  }

  private getUpgradeCost(skill: keyof GameState["pack"], level: number) {
    if (skill === "amount" || skill === "supply")
      return calculatePackUpgradeCost(level);
    if (skill === "good") return this.rulesHandler.getRuleValue("GoodUnlock");
    if (skill === "meta") return this.rulesHandler.getRuleValue("MetaUnlock");

    if (skill === "x10") return this.rulesHandler.getRuleValue("X10Cost");
    if (skill === "x100") return this.rulesHandler.getRuleValue("X100Cost");
    if (skill === "x1000") return this.rulesHandler.getRuleValue("X1000Cost");
    if (skill === "xAll") return this.rulesHandler.getRuleValue("XAllCost");

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

  private autoOpenPack(level: number) {
    const state = this.stateHandler.getState();
    const skill = AllSkills.autoPackSkill;
    if (state.skills.autoPackSkill.on) {
      if (state.pack.xAll.amount === 0)
        this.openPack(skill.effect(level), "free", false);
    }
  }

  private calculatePackCost(type: PackType = "normal") {
    if (type === "express")
      return this.rulesHandler.getRuleValue("PackExpressCost");
    const state = this.stateHandler.getState();
    const cost = this.rulesHandler.getRuleValue("PackCost");

    if (!state.skills.shopkeeperFriendSkill.acquired) return cost;

    const costSkill = AllSkills.shopkeeperFriendSkill;

    return cost * costSkill.effect(state.skills.shopkeeperFriendSkill.level);
  }

  private openPack(
    amount: number,
    type: PackType = "normal",
    logParam?: boolean
  ) {
    const state = this.stateHandler.getState();
    const log = logParam ?? true;

    const cost = this.calculatePackCost(type);

    // If amount is -1, buy as many packs as possible
    if (amount === -1) {
      amount = Math.floor(state.entities.money.amount / cost);
      if (type !== "express")
        amount = Math.min(amount, state.entities.packsupply.amount);
    }

    if (
      state.entities.money.amount >= cost * amount &&
      (amount <= state.entities.packsupply.amount ||
        type === "express" ||
        type === "free")
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

      const workSkillEffect = AllSkills.workSkill.effect(
        state.skills.workSkill.level
      );

      const realPacks = amount;
      if (state.pack.xAll.amount > 0)
        amount = Math.floor(amount * workSkillEffect) + amount;

      if (amount > 1e6) {
        ({
          badCards: badcards,
          goodCards: goodcards,
          metaCards: metacards,
        } = openPacks(
          amount,
          metaCardDropRate,
          goodCardDropRate,
          goodCardPackMax,
          cardsInPack
        ));
      } else {
        for (let i = 0; i < amount; i++) {
          const pack = openPack(
            metaCardDropRate,
            goodCardDropRate,
            goodCardPackMax,
            cardsInPack
          );

          badcards += pack.badcards;
          goodcards += pack.goodcards;
          metacards += pack.metacards;
        }
      }

      state.entities.metacards.amount += metacards;
      state.entities.goodcards.amount += goodcards;
      state.entities.badcards.amount += badcards;

      if (type !== "free") state.entities.money.amount -= cost * realPacks;
      console.log(
        "openPack -> state.entities.money.amount",
        state.entities.money.amount,
        cost
      );

      if (metacards > 0) state.entities.metacards.acquired = true;

      if (goodcards > 0) state.entities.goodcards.acquired = true;

      if (badcards > 0) state.entities.badcards.acquired = true;

      state.entities.packbonuspoints.amount += 1 * amount;

      if (type !== "express" && type !== "free")
        state.entities.packsupply.amount -= realPacks;

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
        if (data === -1) data = state.entities.badcards.amount;
        state.entities.money.amount +=
          this.rulesHandler.getRuleValue("BadCardSellValue") * data;
        state.entities.badcards.amount -= data;
        this.stateHandler.updateState(state);
      }
    }

    if (message === "sellgoodcards") {
      const state = this.stateHandler.getState();
      if (state.entities.goodcards.amount >= data) {
        if (data === -1) data = state.entities.goodcards.amount;
        state.entities.money.amount +=
          this.rulesHandler.getRuleValue("GoodCardSellValue") * data;
        state.entities.goodcards.amount -= data;
        this.stateHandler.updateState(state);
      }
    }

    if (message === "sellmetacards") {
      const state = this.stateHandler.getState();
      if (state.entities.metacards.amount >= data) {
        if (data === -1) data = state.entities.metacards.amount;
        state.entities.money.amount +=
          this.rulesHandler.getRuleValue("MetaCardSellValue") * data;
        state.entities.metacards.amount -= data as number;
        this.stateHandler.updateState(state);
      }
    }
  }
}
