export type Champions = "lsq" | "ron-dinkel" | "mai-pudde";

export type ChampionBattleDeck = {
  slot1: number | undefined;
  slot2: number | undefined;
  slot3: number | undefined;
  slot4: number | undefined;
  slot5: number | undefined;
  slot6: number | undefined;
  slot7: number | undefined;
  slot8: number | undefined;
  slot9: number | undefined;
};

export interface Champion {
  id: Champions;
  name: string;
  deck: ChampionBattleDeck;
  reward: string;
}

const LSQ = {
  id: "lsq",
  name: "LSQ",
  deck: {
    slot1: 25,
    slot2: 33,
    slot3: 28,
    slot4: 39,
    slot5: 21,
    slot6: 36,
    slot7: 30,
    slot8: 23,
    slot9: 37,
  },
  reward: "Doubles pack supply gain",
} as Champion;

const RonDinkel = {
  id: "ron-dinkel",
  name: "Ron Dinkel",
  deck: {
    slot1: 45,
    slot2: 50,
    slot3: 55,
    slot4: 40,
    slot5: 60,
    slot6: 42,
    slot7: 58,
    slot8: 43,
    slot9: 57,
  },
  reward: "Tripples pack supply gain",
} as Champion;

const MaiPudde = {
  id: "mai-pudde",
  name: "Mai Pudde",
  deck: {
    slot1: 53,
    slot2: 58,
    slot3: 62,
    slot4: 67,
    slot5: 70,
    slot6: 51,
    slot7: 56,
    slot8: 60,
    slot9: 64,
  },
  reward: "Quadruples pack supply gain",
} as Champion;

export const AllChampions = [LSQ, RonDinkel, MaiPudde];
