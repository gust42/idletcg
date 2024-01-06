export type AbilityNames = "adept" | "antiweakness" | "overkill";
export type PathNames = "Control" | "Aggro" | "Combo";
interface AbilityLevel {
  requirement: number;
  effect: number;
}

export interface Ability {
  id: AbilityNames;
  friendlyName: string;
  description: string;
  levels: AbilityLevel[];
}

export interface Path {
  level: number;
  skills: Ability[];
}

export const cardMasteryTree: Path[] = [
  {
    level: 1,
    skills: [
      {
        id: "adept",
        friendlyName: "Adept",
        description: "Increase strength of cards",
        levels: [
          {
            requirement: 1010,
            effect: 2,
          },
          {
            requirement: 1100,
            effect: 3,
          },
          {
            requirement: 1200,
            effect: 5,
          },
          {
            requirement: 1400,
            effect: 8,
          },
          {
            requirement: 1800,
            effect: 12,
          },
        ],
      },
    ],
  },
  {
    level: 2,
    skills: [
      {
        id: "antiweakness",
        friendlyName: "I am not weak",
        description:
          "Increase strength of your cards against their bad matchup",
        levels: [
          {
            requirement: 1070,
            effect: 1,
          },
          {
            requirement: 1140,
            effect: 2,
          },
          {
            requirement: 1280,
            effect: 3,
          },
          {
            requirement: 1560,
            effect: 4,
          },
          {
            requirement: 2120,
            effect: 5,
          },
        ],
      },
      {
        id: "overkill",
        friendlyName: "Overkill",
        description:
          "Increase strength of your cards against their good matchup",
        levels: [
          {
            requirement: 1070,
            effect: 1,
          },
          {
            requirement: 1140,
            effect: 2,
          },
          {
            requirement: 1280,
            effect: 3,
          },
          {
            requirement: 1560,
            effect: 4,
          },
          {
            requirement: 2120,
            effect: 5,
          },
        ],
      },
    ],
  },
];
