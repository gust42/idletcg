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
  reward: "Increases pack supply gain by 10x",
} as Champion;

const RonDinkel = {
  id: "ron-dinkel",
  name: "Ron Dinkel",
  deck: {
    slot1: 40,
    slot2: 45,
    slot3: 50,
    slot4: 35,
    slot5: 55,
    slot6: 37,
    slot7: 53,
    slot8: 38,
    slot9: 52,
  },
  reward: "Increases pack supply gain by 100x",
} as Champion;

const MaiPudde = {
  id: "mai-pudde",
  name: "Mai Pudde",
  deck: {
    slot1: 48,
    slot2: 53,
    slot3: 57,
    slot4: 62,
    slot5: 65,
    slot6: 46,
    slot7: 51,
    slot8: 55,
    slot9: 59,
  },
  reward: "Increases pack supply gain by 1000x",
} as Champion;

export const AllChampions = [LSQ, RonDinkel, MaiPudde];
