import { AllRouteNames } from "../logic/navigation";
import { AbilityNames, PathNames } from "../rules/cardmastery";
import { ChampionBattleDeck, Champions } from "../rules/champions";
import { Skills } from "../rules/skills/skill";

import {
  TournamentEntry,
  TournamentLog,
  Tournaments,
} from "../rules/tournaments/tournament";

export interface Entity {
  amount: number;
  acquired: boolean;
}

export interface Route {
  acquired: boolean;
  notify: boolean;
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
}

export type TeamMemberNames =
  | "Terry"
  | "Timmy"
  | "Susan"
  | "Mattias"
  | "Elsa"
  | "Daniel";

export type JoinedTeamMember = {
  name: TeamMemberNames;
  trophies: number;
  rating: number;
  deck: Deck;
  currentTournament?: keyof Tournaments;
  tournamentTicks?: number;
  lastTournament?: TournamentLog;
};
export interface TeamMember {
  name: TeamMemberNames;
  speed: number;
}

export interface Champion {
  lastTournament: TournamentLog | undefined;
  defeated: boolean;
}

export interface Synergy {
  id: number;
  base: number | undefined;
  enabler: number | undefined;
  payoff: number | undefined;
}

export interface GameState {
  synergy: Synergy[];
  trackers: {
    personalAssistantTournament: undefined | keyof Tournaments;
  };
  stats: {
    startedPlaying: number;
    allChampionsDefeated: number;
    highestBadcards: number;
    highestGoodcards: number;
    highestMetacards: number;
    badcardsSold: number;
    goodcardsSold: number;
    metacardsSold: number;
    continuePlaying: boolean;
  };
  champions: Record<Champions, Champion>;
  binder: {
    cards: number[];
    packsupplysetbonus: number;
  };
  cardmastery: {
    path: PathNames | undefined;
    usedPoints: number;
    skills: {
      path1: {
        id: AbilityNames | undefined;
        level: number;
      };
      path2: {
        id: AbilityNames | undefined;
        level: number;
      };
      path3: {
        id: AbilityNames | undefined;
        level: number;
      };
      path4: {
        id: AbilityNames | undefined;
        level: number;
      };
    };
  };
  skills: Record<keyof Skills, SkillState>;
  trophys: Record<keyof Tournaments, number>;
  trophycase: Record<keyof Tournaments, boolean>;
  pack: {
    amount: Entity;
    meta: Entity;
    good: Entity;
    supply: Entity;
    express: Entity;
    x10: Entity;
    x100: Entity;
    x1000: Entity;
    xAll: Entity;
    elsa: Entity;
  };
  entities: {
    badcards: Entity;
    goodcards: Entity;
    metacards: Entity;
    money: Entity;
    rating: Entity;
    packbonuspoints: Entity;
    packsupply: Entity;
    trophies: Entity;
  };
  counters: {
    uniquecards: Counter;
    time: Counter;
    clock: Counter;
  };
  deck: {
    cards: Deck;
    championDeck: ChampionBattleDeck;
  };
  routes: Record<AllRouteNames, Route>;
  activities: {
    tournament?: {
      id: keyof Tournaments;
      deck: Deck;
      currentOpponent: number;
      gameRound: number;
      tournamentRound: number;
      gameRoundStartTime: number;
    };
    champion?: {
      id: Champions;
      deck: Deck;
      gameRound: number;
    };
  };
  logs: {
    tournament: TournamentEntry;
    tournamentHistory: TournamentEntry;
  };
  team: JoinedTeamMember[];
}
