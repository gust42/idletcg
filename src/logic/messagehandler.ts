import { Skills } from "../rules/skills/skill";
import { Tournaments } from "../rules/tournaments/tournament";
import { PackMessages } from "./packmanager";

type MessageList =
  | PackMessages
  | "unlockskill"
  | "levelupskill"
  | "toggleskill"
  | "addcardtodeck"
  | "entertournament"
  | "assigntournament"
  | "clearmessages"
  | "tradecard";

type Message = {
  message: MessageList;
  data: MessageData;
};

export type MessageData =
  | GenericMessage
  | SkillMessage
  | DeckMessage
  | AssignTournamentMessage
  | TournamentMessage;

export type GenericMessage = {
  [key: string]: unknown;
};

export type SkillMessage = {
  name: keyof Skills;
};

export type DeckMessage = {
  id: number;
  slot: number;
  person: "me" | string;
};

export type TournamentMessage = {
  id: keyof Tournaments;
};

export type AssignTournamentMessage = {
  id: keyof Tournaments;
  person: string;
};

export type ClientMessageData = Record<string, unknown>;

type Callback = (message: string, data: ClientMessageData) => void;

export default class MessageHandler {
  static messageQue: Message[] = [];
  static clientSubscriptions: Callback[] = [];

  static init() {
    this.messageQue = [];
    this.clientSubscriptions = [];
  }

  static recieveMessage<T = MessageData>(message: MessageList, data: T) {
    if (!this.messageQue) this.init();
    console.log(message, data);
    this.messageQue.push({ message, data: data as MessageData });
  }

  static getandClearMessages(): Message[] {
    const tmp = [...this.messageQue];
    this.messageQue = [];
    return tmp;
  }

  static sendClientMessage(message: string, data: ClientMessageData = {}) {
    this.clientSubscriptions.forEach((callback: Callback) => {
      callback(message, data);
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
