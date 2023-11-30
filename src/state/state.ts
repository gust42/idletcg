import { GameState } from "../interfaces/logic";

export const state: GameState = {
  skills: {
    autoPackSkill: {
      acquired: false,
      level: 1,
      on: true,
    },
    workSkill: {
      acquired: false,
      level: 1,
      on: false,
    },
    shopkeeperFriendSkill: {
      acquired: false,
      level: 1,
      on: false,
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
  },
  counters: {
    uniquecards: {
      amount: 0,
    },
    time: {
      amount: Date.now(),
    },
  },

  logs: {},
};
