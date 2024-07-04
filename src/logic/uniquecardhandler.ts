import { GameState } from "../interfaces/logic";
import {
  calculatePackSupplySetBonus,
  calculateUniqueCardCost,
} from "./helpers";
import { Message } from "./messagehandler";

export type UniqueCardMessages = "tradecard";

export type UniqueCardMessageData = { id: number };

const cardsPerSet = 3;

export const getIdsForRow = (row: number) => {
  const ids = [];
  for (let i = 0; i < cardsPerSet; i++) {
    ids.push(row * cardsPerSet + i);
  }
  return ids;
};

export const isRowUnlocked = (row: number, state: GameState) => {
  const ids = getIdsForRow(row);
  return state.binder.cards.some((id) => ids.includes(id));
};

export const isRowCompleted = (row: number, state: GameState) => {
  const ids = getIdsForRow(row);
  return ids.every((id) => state.binder.cards.includes(id));
};

export const handleUniqueCardMessage = (m: Message, state: GameState) => {
  if (m.message === "tradecard") {
    const data = m.data as UniqueCardMessageData;
    let fail = "";

    const [costBadCards, costGoodCards, costMetaCards] =
      calculateUniqueCardCost(data.id as number, state);

    if (state.entities.badcards.amount < costBadCards)
      fail += "Not enough bad cards \n";
    if (state.entities.goodcards.amount < costGoodCards)
      fail += "Not enough good cards \n";
    if (state.entities.metacards.amount < costMetaCards)
      fail += "Not enough meta cards";

    if (!fail) {
      const cardSet = Math.floor(data.id / cardsPerSet);
      const rowUnlocked = isRowUnlocked(cardSet, state);
      const rowCompleted = isRowCompleted(cardSet, state);
      state.counters.uniquecards.amount++;
      state.binder.cards.push(data.id as number);
      state.entities.badcards.amount = Math.floor(
        state.entities.badcards.amount - costBadCards
      );
      state.entities.goodcards.amount = Math.floor(
        state.entities.goodcards.amount - costGoodCards
      );
      state.entities.metacards.amount = Math.floor(
        state.entities.metacards.amount - costMetaCards
      );

      const { unlock, complete } = calculatePackSupplySetBonus(cardSet);

      if (!rowUnlocked && isRowUnlocked(cardSet, state)) {
        state.entities.packsupply.amount += unlock;
      }

      if (!rowCompleted && isRowCompleted(cardSet, state)) {
        state.binder.packsupplysetbonus += complete;
      }
    }
  }

  return state;
};
