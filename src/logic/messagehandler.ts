import { Skills } from "../rules/skills/skill";
import { PackMessages } from "./packmanager";

type MessageList =
  | PackMessages
  | "unlockskill"
  | "levelupskill"
  | "toggleskill"
  | "addcardtodeck"
  | "tradecard";

type Message = {
  message: MessageList;
  data: MessageData;
};

export type MessageData = GenericMessage | SkillMessage | DeckMessage;

export type GenericMessage = {
  [key: string]: unknown;
};

export type SkillMessage = {
  name: keyof Skills;
};

export type DeckMessage = {
  id: number;
  slot: number;
};

type Callback = (message: string) => void;

export default class MessageHandler {
  static messageQue: Message[] = [];
  static clientSubscriptions: Callback[] = [];

  static init() {
    this.messageQue = [];
    this.clientSubscriptions = [];
  }

  static recieveMessage(message: MessageList, data: MessageData) {
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
