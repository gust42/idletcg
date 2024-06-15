export type AbilityNames =
  | "adept"
  | "antiweakness"
  | "overkill"
  | "first"
  | "second"
  | "third"
  | "master";
export type PathNames = "Control" | "Aggro" | "Combo";
interface AbilityLevel {
  effect: number;
}

export interface Ability {
  id: AbilityNames;
  friendlyName: string;
  description: string;
  effectType: "additive" | "multiplicative";
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
        effectType: "additive",
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
        effectType: "additive",
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
        effectType: "additive",
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
  {
    level: 3,
    skills: [
      {
        id: "first",
        friendlyName: "First",
        description: "Increase strength of first card played in a turn",
        effectType: "multiplicative",
        levels: [
          {
            effect: 5,
          },
          {
            effect: 10,
          },
          {
            effect: 15,
          },
          {
            effect: 20,
          },
          {
            effect: 25,
          },
        ],
      },
      {
        id: "second",
        friendlyName: "Second",
        description: "Increase strength of second card played in a turn",
        effectType: "multiplicative",
        levels: [
          {
            effect: 5,
          },
          {
            effect: 10,
          },
          {
            effect: 15,
          },
          {
            effect: 20,
          },
          {
            effect: 25,
          },
        ],
      },
      {
        id: "third",
        friendlyName: "Third",
        description: "Increase strength of third card played in a turn",
        effectType: "multiplicative",
        levels: [
          {
            effect: 5,
          },
          {
            effect: 10,
          },
          {
            effect: 15,
          },
          {
            effect: 20,
          },
          {
            effect: 25,
          },
        ],
      },
    ],
  },
  {
    level: 4,
    skills: [
      {
        id: "master",
        friendlyName: "Master",
        description: "Increase strength of all cards played in a turn",
        effectType: "multiplicative",
        levels: [
          {
            effect: 5,
          },
          {
            effect: 10,
          },
          {
            effect: 15,
          },
          {
            effect: 20,
          },
          {
            effect: 25,
          },
        ],
      },
    ],
  },
];
