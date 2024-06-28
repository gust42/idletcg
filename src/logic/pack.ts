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

function getRandomGaussian(mean: number, stdDev: number) {
  let u = 0,
    v = 0;
  while (u === 0) u = Math.random(); //Converting [0,1) to (0,1)
  while (v === 0) v = Math.random();
  let num = Math.sqrt(-2.0 * Math.log(u)) * Math.cos(2.0 * Math.PI * v);

  num = num / 10.0 + 0.5; // Translate to 0 -> 1
  if (num > 1 || num < 0) return getRandomGaussian(mean, stdDev); // resample between 0 and 1
  num *= stdDev; // Multiply by standard deviation
  num += mean; // Add the mean
  return num;
}

export function openPacks(
  packCount: number,
  metaDropRate: number,
  goodDropRate: number,
  goodPackMax: number,
  cardsInPack: number
) {
  const state = GameLoop.getInstance().stateHandler.getState();
  const expectedMetaCards = getRandomGaussian(
    metaDropRate * packCount,
    Math.sqrt(packCount)
  );
  const expectedGoodCards = getRandomGaussian(
    goodDropRate * packCount * goodPackMax,
    Math.sqrt(packCount)
  );
  const expectedBadCards =
    packCount * (cardsInPack + state.pack.amount.amount) -
    expectedMetaCards -
    expectedGoodCards;

  return {
    metaCards: Math.floor(expectedMetaCards),
    goodCards: Math.floor(expectedGoodCards),
    badCards: Math.floor(expectedBadCards),
  };
}
