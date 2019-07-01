export default class MessageHandler {
    constructor() {
        MessageHandler.init();
    }
    static init() {
        this.messageQue = [];
    }
    static recieveMessage(message) {
        console.log(message);
        this.messageQue.push(message);
    }
}