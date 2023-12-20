import GameLoop from "./gameloop";

type Cards = {
  goodcards: number;
  metacards: number;
  badcards: number;
};

export default class Pack {
  goodcards = 0;
  metacards = 0;
  badcards: number;

  constructor(
    metaDropRate: number,
    goodDropRate: number,
    goodPackMax: number,
    cardsInPack: number
  ) {
    const state = GameLoop.getInstance().stateHandler.getState();

    if (state.pack.meta.amount === 1) {
      this.metacards = Math.random() < metaDropRate ? 1 : 0;
    }

    if (state.pack.good.amount === 1) {
      for (let i = 0; i < goodPackMax; i++) {
        this.goodcards += Math.random() < goodDropRate ? 1 : 0;
      }
    }
    this.badcards =
      cardsInPack + state.pack.amount.amount - this.metacards - this.goodcards;
  }

  getCards(): Cards {
    return {
      goodcards: this.goodcards,
      metacards: this.metacards,
      badcards: this.badcards,
    };
  }
}
