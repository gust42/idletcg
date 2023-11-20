type Message = {
  message: string;
  data: MessageData;
};

export type MessageData = {
  [key: string]: unknown;
};

type Callback = (message: string) => void;

export default class MessageHandler {
  static messageQue: Message[] = [];
  static clientSubscriptions: Callback[] = [];

  static init() {
    this.messageQue = [];
    this.clientSubscriptions = [];
  }

  static recieveMessage(message: string, data: MessageData) {
    if (!this.messageQue) this.init();
    console.log(message, data);
    this.messageQue.push({ message, data });
  }

  static getandClearMessages(): Message[] {
    const tmp = [...this.messageQue];
    this.messageQue = [];
    return tmp;
  }

  static sendClientMessage(message: string) {
    this.clientSubscriptions.forEach((callback: Callback) => {
      callback(message);
    });
  }

  static addClientSubscription(callback: Callback) {
    this.clientSubscriptions.push(callback);
  }

  static removeClientSubscription(callback: Callback) {
    const index = this.clientSubscriptions.findIndex((c) => c === callback);
    this.clientSubscriptions.splice(index, 1);
  }
}
