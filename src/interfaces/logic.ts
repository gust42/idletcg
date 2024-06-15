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
export interface TeamMember {
  name: string;
  rating: number;
  speed: number;
  deck: Deck;
  currentTournament?: keyof Tournaments;
  tournamentTicks?: number;
  lastTournament?: TournamentLog;
}

export interface Champion {
  lastTournament: TournamentLog | undefined;
  defeated: boolean;
}

export interface GameState {
  stats: {
    startedPlaying: number;
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
    };
    champion?: {
      id: Champions;
      deck: Deck;
      gameRound: number;
    };
  };
  logs: {
    tournament: TournamentEntry;
  };
  team: TeamMember[];
}
