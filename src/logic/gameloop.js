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
        while(messages && messages.length > 0) {
            const message = messages.shift();
            if (message === 'openpack') {
                const state = this.stateHandler.getState();
                if (state.money >= this.rulesHandler.getRuleValue('PackCost')) {
                
                const pack = new Pack();

                state.metacards += pack.metacards;
                state.goodcards += pack.goodcards;
                state.badcards += pack.badcards;
                state.money -= 10;

                this.stateHandler.updateState(state);
                
                MessageHandler.sendClientMessage(`Pack contains ${pack.badcards} bad cards, ${pack.goodcards} good cards and ${pack.metacards} meta cards `);
                } else {
                    MessageHandler.sendClientMessage('Not enough money');
                }
                
            }

            
            if (message === 'sellbadcards') {
                
                const state = this.stateHandler.getState();
                if (state.badcards >= 1) {
                    state.money += 0.5;
                    state.badcards--;
                    this.stateHandler.updateState(state);
                }
            }

            if (message === 'sellgoodcards') {
                
                const state = this.stateHandler.getState();
                if (state.goodcards >= 1) {
                    state.money += 5;
                    state.goodcards--;
                    this.stateHandler.updateState(state);
                }
            }
        }

        const state = this.stateHandler.getState();

        window.requestAnimationFrame(this.loop.bind(this));

    }
}