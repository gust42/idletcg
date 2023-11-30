import { TournamentLog, Tournaments } from "../rules/tournaments/tournament";

export interface Entity {
  amount: number;
  acquired: boolean;
}

export interface Tab {
  acquired: boolean;
}

export interface SkillState {
  acquired: boolean;
  level: number;
  on?: boolean;
}

export interface Counter {
  amount: number;
}

export interface Deck {
  slot1: number | undefined;
  slot2: number | undefined;
  slot3: number | undefined;
  slot4: number | undefined;
}

export interface GameStateV1 {
  badcards: Entity;
  goodcards: Entity;
  metacards: Entity;
  money: Entity;
  packstab: Tab;
  skillstab: Tab;
  tradebindertab: Tab;
  tournamentstab: Tab;
  autopackskill: SkillState;
  workskill: SkillState;
  uniquecards: Counter;
}

export interface GameState {
  skills: {
    autoPackSkill: SkillState;
    workSkill: SkillState;
    shopkeeperFriendSkill: SkillState;
  };
  entities: {
    badcards: Entity;
    goodcards: Entity;
    metacards: Entity;
    money: Entity;
    rating: Entity;
  };
  counters: {
    uniquecards: Counter;
    time: Counter;
  };
  deck: {
    cards: Deck;
  };
  tabs: {
    packstab: Tab;
    skillstab: Tab;
    tradebindertab: Tab;
    deckbuildertab: Tab;
    tournamentstab: Tab;
  };
  activities: {
    tournament?: {
      id: keyof Tournaments;
      deck: Deck;
      currentOpponent: number;
      gameRound: number;
      tournamentRound: number;
    };
  };
  logs: {
    tournament?: TournamentLog;
  };
}
