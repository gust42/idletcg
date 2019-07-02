export default class MessageHandler {
    static init() {
        this.messageQue = [];
    }
    static recieveMessage(message) {
        // if (!this.messageQue)
        //     this.init();
        console.log(message);
        this.messageQue.push(message);
    }
}