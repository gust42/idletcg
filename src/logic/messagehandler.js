export default class MessageHandler {
    static init() {
        this.messageQue = [];
        this.clientSubscriptions = [];
    }
    static recieveMessage(message, data) {
        if (!this.messageQue)
            this.init();
        console.log(message, data);
        this.messageQue.push({message, data});
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

    static removeClientSubscription(callback) {
        const index = this.clientSubscriptions.findIndex(c => c === callback);
        this.clientSubscriptions.splice(index, 1);
    }
}