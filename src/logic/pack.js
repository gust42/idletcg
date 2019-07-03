import GameLoop from "./gameloop";

export default class Pack {
    constructor() {
        const rules = GameLoop.getInstance().rulesHandler;
        this.goodcards = 0;
        this.metacards = Math.random() < rules.getRuleValue('MetaCardDroprate') ? 1 : 0;
        for (let i = 0; i < rules.getRuleValue('GoodCardPackMax'); i++) {
        this.goodcards += Math.random() < rules.getRuleValue('GoodCardDroprate') ? 1 : 0;
        }
        this.badcards = 10 - this.metacards - this.goodcards;
    }

    getCards() {
        return { goodcards: this.goodcards, metacards: this.metacards, badcards: this.badcards};
    }
}