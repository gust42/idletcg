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
  tabs: {
    packstab: {
      acquired: true,
    },
    skillstab: {
      acquired: false,
    },
    tradebindertab: {
      acquired: false,
    },
    deckbuildertab: {
      acquired: false,
    },
    tournamentstab: {
      acquired: false,
    },
    teamtab: {
      acquired: false,
    },
    trophystab: {
      acquired: false,
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
