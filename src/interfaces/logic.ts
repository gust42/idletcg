import { AllRouteNames } from "../logic/navigation";
import { AbilityNames, PathNames } from "../rules/cardmastery";
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
  slot4: number | undefined;
}

export interface TrophyCase {
  slot1: keyof Tournaments | undefined;
  slot2: keyof Tournaments | undefined;
  slot3: keyof Tournaments | undefined;
}

export interface TeamMember {
  name: string;
  rating: number;
  speed: number;
  deck: Deck;
  currentTournament?: keyof Tournaments;
  tournamentTicks?: number;
  lastTournament?: TournamentLog;
}

export interface GameState {
  binder: {
    cards: number[];
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
    };
  };
  skills: Record<keyof Skills, SkillState>;
  trophys: Record<keyof Tournaments, number>;
  trophycase: TrophyCase;
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
  };
  entities: {
    badcards: Entity;
    goodcards: Entity;
    metacards: Entity;
    money: Entity;
    rating: Entity;
    packbonuspoints: Entity;
    packsupply: Entity;
  };
  counters: {
    uniquecards: Counter;
    time: Counter;
  };
  deck: {
    cards: Deck;
  };
  routes: Record<AllRouteNames, Route>;
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
    tournament: TournamentEntry;
  };
  team: TeamMember[];
}
