import MessageHandler from './messagehandler';
import StateHandler from '../state/statehandler';

export default class GameLoop {
    constructor() {
        this.cards = 0;
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
                state.cards++;
                this.stateHandler.updateState(state);
            }
        }

        const state = this.stateHandler.getState();
        console.log(state.cards);

        window.requestAnimationFrame(this.loop.bind(this));

    }
}