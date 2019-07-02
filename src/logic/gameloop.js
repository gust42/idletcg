import MessageHandler from './messagehandler';
import StateHandler from '../state/statehandler';
import Pack from './pack';

export default class GameLoop {
    constructor() {
        MessageHandler.init();
        this.stateHandler = new StateHandler();
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
                if (state.money > 10) {
                
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
        }

        const state = this.stateHandler.getState();

        window.requestAnimationFrame(this.loop.bind(this));

    }
}