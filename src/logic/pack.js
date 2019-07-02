export default class Pack {
    constructor() {
        this.goodcards = 0;
        this.metacards = Math.random() < 0.1 ? 1 : 0;
        for (let i = 0; i < 3; i++) {
        this.goodcards += Math.random() < 0.2 ? 1 : 0;
        }
        this.badcards = 10 - this.metacards - this.goodcards;
    }

    getCards() {
        return { goodcards: this.goodcards, metacards: this.metacards, badcards: this.badcards};
    }
}