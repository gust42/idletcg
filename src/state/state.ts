import { GameStateV1 } from "../interfaces/logic";

export const state: GameStateV1 = {
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
  money: {
    amount: 50,
    acquired: true,
  },
  packstab: {
    acquired: true,
  },
  skillstab: {
    acquired: false,
  },
  tradebindertab: {
    acquired: false,
  },
  tournamentstab: {
    acquired: false,
  },
  autopackskill: {
    acquired: false,
    level: 1,
  },
  workskill: {
    acquired: false,
    level: 1,
  },
  uniquecards: {
    amount: 0,
  },
};
