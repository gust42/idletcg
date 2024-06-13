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
    slot1: 75,
    slot2: 80,
    slot3: 85,
    slot4: 70,
    slot5: 90,
    slot6: 72,
    slot7: 88,
    slot8: 73,
    slot9: 87,
  },
  reward: "Tripples pack supply gain",
} as Champion;

const MaiPudde = {
  id: "mai-pudde",
  name: "Mai Pudde",
  deck: {
    slot1: 83,
    slot2: 88,
    slot3: 92,
    slot4: 97,
    slot5: 100,
    slot6: 81,
    slot7: 86,
    slot8: 90,
    slot9: 94,
  },
  reward: "Quadruples pack supply gain",
} as Champion;

export const AllChampions = [LSQ, RonDinkel, MaiPudde];