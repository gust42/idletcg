import GameLoop from "./gameloop";

type Cards = {
  goodcards: number;
  metacards: number;
  badcards: number;
};

export default class Pack {
  goodcards: number;
  metacards: number;
  badcards: number;

  constructor() {
    const rules = GameLoop.getInstance().rulesHandler;
    this.goodcards = 0;
    this.metacards =
      Math.random() < rules.getRuleValue("MetaCardDroprate") ? 1 : 0;
    for (let i = 0; i < rules.getRuleValue("GoodCardPackMax"); i++) {
      this.goodcards +=
        Math.random() < rules.getRuleValue("GoodCardDroprate") ? 1 : 0;
    }
    this.badcards = 10 - this.metacards - this.goodcards;
  }

  getCards(): Cards {
    return {
      goodcards: this.goodcards,
      metacards: this.metacards,
      badcards: this.badcards,
    };
  }
}
