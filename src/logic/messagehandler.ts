import { TeamMemberNames } from "../interfaces/logic";
import { Champions } from "../rules/champions";
import { Skills } from "../rules/skills/skill";
import { Tournaments } from "../rules/tournaments/tournament";
import { CardMasteryMessages } from "./cardmastery";
import { AllRouteNames } from "./navigation";
import { PackMessages } from "./packmanager";
import { Postion } from "./synergy/synergy";
import { TournamentMessages } from "./tournamentmanager";
import { UniqueCardMessageData, UniqueCardMessages } from "./uniquecardhandler";

type MessageList =
  | CardMasteryMessages
  | PackMessages
  | UniqueCardMessages
  | TournamentMessages
  | "championbattle"
  | "unlockskill"
  | "levelupskill"
  | "toggleskill"
  | "addcardtodeck"
  | "addcardtochampiondeck"
  | "clearmessages"
  | "clearnotifier"
  | "buytrophy"
  | "addtrophy"
  | "addsynergy";

export type Message<T = MessageData> = {
  message: MessageList;
  data: T;
};

export type MessageData =
  | GenericMessage
  | SkillMessage
  | DeckMessage
  | AssignTournamentMessage
  | UniqueCardMessageData
  | BuyTrophyMessage
  | AddSynergyMessage
  | TournamentMessage;

export type GenericMessage = {
  [key: string]: unknown;
};

export type SkillMessage = {
  name: keyof Skills;
};
export type TrophyMessage = {
  trophy: keyof Tournaments;
};
export type DeckMessage = {
  id: number;
  slot: number;
  person: "me" | string;
};
export type NotifierMessage = {
  route: AllRouteNames;
};

export type TournamentMessage = {
  id: keyof Tournaments | undefined;
};

export type ChampionBattleMessage = {
  id: Champions;
};

export type AssignTournamentMessage = {
  id?: keyof Tournaments;
  person: string;
};

export type BuyTrophyMessage = {
  teamMember: TeamMemberNames;
  amount: number;
};

export type AddSynergyMessage = {
  id: number;
  cardId: number | undefined;
  position: Postion;
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
