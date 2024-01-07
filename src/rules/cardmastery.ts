export type AbilityNames = "adept" | "antiweakness" | "overkill";
export type PathNames = "Control" | "Aggro" | "Combo";
interface AbilityLevel {
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
            effect: 2,
          },
          {
            effect: 3,
          },
          {
            effect: 5,
          },
          {
            effect: 8,
          },
          {
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
            effect: 1,
          },
          {
            effect: 2,
          },
          {
            effect: 3,
          },
          {
            effect: 4,
          },
          {
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
            effect: 1,
          },
          {
            effect: 2,
          },
          {
            effect: 3,
          },
          {
            effect: 4,
          },
          {
            effect: 5,
          },
        ],
      },
    ],
  },
];
