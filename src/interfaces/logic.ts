import { routeConfig } from "../logic/navigation";
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
  slot1: string | undefined;
  slot2: string | undefined;
  slot3: string | undefined;
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
  routes: Record<keyof typeof routeConfig, Route>;
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
