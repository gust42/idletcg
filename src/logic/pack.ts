import GameLoop from "./gameloop";

export const openPack = (
  metaDropRate: number,
  goodDropRate: number,
  goodPackMax: number,
  cardsInPack: number
) => {
  const cards = {
    goodcards: 0,
    metacards: 0,
    badcards: 0,
  };

  const state = GameLoop.getInstance().stateHandler.getState();

  if (state.pack.meta.amount === 1) {
    cards.metacards = Math.random() < metaDropRate ? 1 : 0;
  }

  if (state.pack.good.amount === 1) {
    for (let i = 0; i < goodPackMax; i++) {
      cards.goodcards += Math.random() < goodDropRate ? 1 : 0;
    }
  }
  cards.badcards =
    cardsInPack + state.pack.amount.amount - cards.metacards - cards.goodcards;

  return cards;
};
