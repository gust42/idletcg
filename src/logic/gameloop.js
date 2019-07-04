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

                    for (let i = 0; i < m.data; i++) {
                        const pack = new Pack();

                        state.metacards.amount += pack.metacards;
                        state.goodcards.amount += pack.goodcards;
                        state.badcards.amount += pack.badcards;
                        state.money.amount -= 10;

                        if (pack.metacards > 0)
                            state.metacards.acquired = true;

                        if (pack.goodcards > 0)
                            state.goodcards.acquired = true;

                        if (pack.badcards > 0)
                            state.badcards.acquired = true;
                        
                        MessageHandler.sendClientMessage(`Pack contains ${pack.badcards} bad cards, ${pack.goodcards} good cards and ${pack.metacards} meta cards `);
                    }




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
        }

        window.requestAnimationFrame(this.loop.bind(this));

    }
}