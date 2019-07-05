import MessageHandler from './messagehandler';
import StateHandler from '../state/statehandler';
import Pack from './pack';
import RulesHandler from '../rules/ruleshandler';

export default class GameLoop {
    constructor() {
        MessageHandler.init();
        this.stateHandler = new StateHandler();
        this.rulesHandler = new RulesHandler();
    }

    static getInstance() {
        if (!this.instance)
            this.instance = new GameLoop();
        return this.instance;
    }

    start() {
        this.loop();
    }

    loop() {
        const messages = MessageHandler.getandClearMessages();
        while (messages && messages.length > 0) {
            const m = messages.shift();
            if (m.message === 'openpack') {
                const state = this.stateHandler.getState();
                if (state.money.amount >= this.rulesHandler.getRuleValue('PackCost') * m.data) {

                    let badcards = 0, goodcards = 0, metacards = 0;
                    for (let i = 0; i < m.data; i++) {
                        const pack = new Pack();

                        badcards += pack.badcards;
                        goodcards += pack.goodcards;
                        metacards += pack.metacards;
                    }

                    state.metacards.amount += metacards;
                    state.goodcards.amount += goodcards;
                    state.badcards.amount += badcards;
                    state.money.amount -= 10 * m.data;

                    if (metacards > 0)
                        state.metacards.acquired = true;

                    if (goodcards > 0)
                        state.goodcards.acquired = true;

                    if (badcards > 0)
                        state.badcards.acquired = true;

                    MessageHandler.sendClientMessage(`${(m.data > 1 ? 'Packs' : 'Pack')} contains ${badcards} bad cards, ${goodcards} good cards and ${metacards} meta cards `);



                    this.stateHandler.updateState(state);
                } else {
                    MessageHandler.sendClientMessage('Not enough money');
                }

            }


            if (m.message === 'sellbadcards') {

                const state = this.stateHandler.getState();
                if (state.badcards.amount >= m.data) {
                    state.money.amount += this.rulesHandler.getRuleValue('BadCardSellValue') * m.data;
                    state.badcards.amount -= m.data;
                    this.stateHandler.updateState(state);
                }
            }

            if (m.message === 'sellgoodcards') {

                const state = this.stateHandler.getState();
                if (state.goodcards.amount >= m.data) {
                    state.money.amount += this.rulesHandler.getRuleValue('GoodCardSellValue') * m.data;
                    state.goodcards.amount -= m.data;
                    this.stateHandler.updateState(state);
                }
            }

            if (m.message === 'sellmetacards') {

                const state = this.stateHandler.getState();
                if (state.metacards.amount >= m.data) {
                    state.money.amount += this.rulesHandler.getRuleValue('MetaCardSellValue') * m.data;
                    state.metacards.amount -= m.data;
                    this.stateHandler.updateState(state);
                }
            }

            if (m.message === 'unlockskill') {
                const state = this.stateHandler.getState();
                state[m.data].acquired = true;
                console.log(m.data + ': ' +state[m.data].acquired)
                this.stateHandler.updateState(state);
            }

        }

        let state = this.stateHandler.getState();
        state = this.rulesHandler.checkActiveRules(state);
        if (state) {
            this.stateHandler.updateState(state);
        }

        state = this.stateHandler.getState();
        if (state.badcards.amount === 0 && state.goodcards.amount === 0 && state.metacards.amount === 0 && state.money.amount < this.rulesHandler.getRuleValue('PackCost')) {
            MessageHandler.sendClientMessage('Your aunt visits and gives you 50 money');
            state.money.amount += 50;
            this.stateHandler.updateState(state);
        }

        window.requestAnimationFrame(this.loop.bind(this));

    }
}