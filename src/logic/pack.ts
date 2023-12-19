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

  constructor() {
    const rules = GameLoop.getInstance().rulesHandler;
    const state = GameLoop.getInstance().stateHandler.getState();

    if (state.pack.meta.amount === 1) {
      this.metacards =
        Math.random() < rules.getRuleValue("MetaCardDroprate") ? 1 : 0;
    }

    if (state.pack.good.amount === 1) {
      for (let i = 0; i < rules.getRuleValue("GoodCardPackMax"); i++) {
        this.goodcards +=
          Math.random() < rules.getRuleValue("GoodCardDroprate") ? 1 : 0;
      }
    }
    this.badcards = state.pack.amount.amount - this.metacards - this.goodcards;
  }

  getCards(): Cards {
    return {
      goodcards: this.goodcards,
      metacards: this.metacards,
      badcards: this.badcards,
    };
  }
}
