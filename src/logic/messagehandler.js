export default class MessageHandler {
    static init() {
        this.messageQue = [];
        this.clientSubscriptions = [];
    }
    static recieveMessage(message) {
        if (!this.messageQue)
            this.init();
        console.log(message);
        this.messageQue.push(message);
    }

    static getandClearMessages() {
        const tmp = [...this.messageQue];
        this.messageQue = [];
        return tmp;
    }

    static sendClientMessage(message) {
        this.clientSubscriptions.forEach((callback) => {
            callback(message);
        });
    }

    static addClientSubscription(callback) {
        this.clientSubscriptions.push(callback);
    }
}