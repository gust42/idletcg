import { GameState } from "../interfaces/logic";
import { TournamentEntry } from "../rules/tournaments/tournament";

export const state: GameState = {
  trophys: {
    casualwednesday: 0,
    funfriday: 0,
    competativesaturday: 0,
  },
  pack: {
    amount: {
      acquired: false,
      amount: 0,
    },
    meta: {
      acquired: false,
      amount: 0,
    },
    good: {
      acquired: false,
      amount: 0,
    },
    supply: {
      acquired: false,
      amount: 0,
    },
    express: {
      acquired: false,
      amount: 0,
    },
    x10: {
      acquired: false,
      amount: 0,
    },
    x100: {
      acquired: false,
      amount: 0,
    },
    x1000: {
      acquired: false,
      amount: 0,
    },
    xAll: {
      acquired: false,
      amount: 0,
    },
  },
  skills: {
    autoPackSkill: {
      acquired: false,
      level: 1,
      on: true,
    },
    workSkill: {
      acquired: false,
      level: 1,
      on: undefined,
    },
    shopkeeperFriendSkill: {
      acquired: false,
      level: 1,
      on: undefined,
    },
    tournamentGrinder: {
      acquired: false,
      level: 1,
      on: undefined,
    },
  },
  activities: {
    tournament: undefined,
  },
  entities: {
    money: {
      amount: 50,
      acquired: true,
    },
    badcards: {
      amount: 0,
      acquired: false,
    },
    goodcards: {
      amount: 0,
      acquired: false,
    },
    metacards: {
      amount: 0,
      acquired: false,
    },
    rating: {
      amount: 1000,
      acquired: false,
    },
    packbonuspoints: {
      amount: 0,
      acquired: false,
    },
    packsupply: {
      amount: 10000,
      acquired: true,
    },
  },
  deck: {
    cards: {
      slot1: undefined,
      slot2: undefined,
      slot3: undefined,
      slot4: undefined,
    },
  },
  routes: {
    tournamentlog: {
      acquired: true,
      notify: false,
    },
    settings: {
      acquired: true,
      notify: false,
    },
    activetournament: {
      acquired: true,
      notify: false,
    },
    tournaments: {
      acquired: false,
      notify: false,
    },
    team: {
      acquired: false,
      notify: false,
    },
    skills: {
      acquired: false,
      notify: false,
    },
    trophys: {
      acquired: false,
      notify: false,
    },
    packstab: {
      acquired: true,
      notify: false,
    },
    skillstab: {
      acquired: false,
      notify: false,
    },
    tradebindertab: {
      acquired: false,
      notify: false,
    },
    deckbuildertab: {
      acquired: false,
      notify: false,
    },
    tournamentstab: {
      acquired: false,
      notify: false,
    },
  },
  counters: {
    uniquecards: {
      amount: 0,
    },
    time: {
      amount: Date.now(),
    },
  },
  logs: {
    tournament: {} as TournamentEntry,
  },
  team: [],
  trophycase: {
    slot1: undefined,
    slot2: undefined,
    slot3: undefined,
  },
};
