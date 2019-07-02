import { state } from './state';

export default class StateHandler {
    constructor() {
        this.state = state;
        this.subscribers = [];
    }

    getState(state) {
        return {...this.state};
    }

    updateState(state) {
        this.state = {...this.state, ...state};
        const result = {...this.state}
        for (const sub of this.subscribers) {
            sub(result);
        }
        return result;
    }

    subscribe(callback) {
        this.subscribers.push(callback);
    } 

    unsubscribe(callback) {
        const index = this.subscribers.findIndex(c => c === callback);
        this.subscribers.splice(index, 1);
    }
}