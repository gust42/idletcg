import { GameState } from "../interfaces/logic";
import { AbilityNames, PathNames, cardMasteryTree } from "../rules/cardmastery";
import { calculateCardMasteryPoints } from "./helpers";
import { Message } from "./messagehandler";

export type CardMasteryMessages = "buycardmastery" | "resetcardmastery";

export type CardMasteryMessage = {
  path: PathNames | undefined;
  skill: AbilityNames | undefined;
};

export const handleCardMasteryMessage = (
  message: Message,
  state: GameState
) => {
  const data = message.data as CardMasteryMessage;
  if (message.message === "buycardmastery") {
    state.cardmastery.path = data.path;
    if (data.path) {
      if (data.skill) {
        const path = cardMasteryTree.find((p) =>
          p.skills.find((s) => s.id === data.skill)
        );

        const skill = path?.skills.find((s) => s.id === data.skill);

        const pathLevel = `path${path?.level}` as "path1";
        const skillState = state.cardmastery.skills[pathLevel];

        const availablePoints =
          calculateCardMasteryPoints() - state.cardmastery.usedPoints;

        if (skill && pathLevel && availablePoints > 0) {
          skillState.id = data.skill;
          skillState.level++;
          state.cardmastery.usedPoints++;
        }
      }
    }
  }

  if (message.message === "resetcardmastery") {
    state.cardmastery.path = undefined;
    Object.keys(state.cardmastery.skills).forEach((key) => {
      state.cardmastery.skills[key as "path1"].id = undefined;
      state.cardmastery.skills[key as "path1"].level = 0;
    });
    state.cardmastery.usedPoints = 0;
  }
  return state;
};

export function applyAdeptEffect(
  winRate: number,
  metaType: string,
  state: GameState
) {
  if (metaType === state.cardmastery.path) {
    const path1Skill = state.cardmastery.skills.path1;

    if (path1Skill.id === "adept" && state.cardmastery.path === metaType) {
      const skill = cardMasteryTree
        .find((p) => p.level === 1)
        ?.skills.find((s) => s.id === path1Skill.id);
      if (skill) {
        winRate += skill.levels[path1Skill.level - 1].effect;
      }
    }
  }

  return winRate;
}

export function applyAntiWeaknessEffect(
  winRate: number,
  metaType: string,
  state: GameState
) {
  if (metaType === state.cardmastery.path) {
    const path2Skill = state.cardmastery.skills.path2;
    if (
      path2Skill.id === "antiweakness" &&
      state.cardmastery.path === metaType
    ) {
      const skill = cardMasteryTree
        .find((p) => p.level === 2)
        ?.skills.find((s) => s.id === path2Skill.id);
      if (skill) {
        winRate += skill.levels[path2Skill.level - 1].effect / 100;
      }
    }
  }
  return winRate;
}

export function applyOverKillEffect(
  winRate: number,
  metaType: string,
  state: GameState
) {
  if (metaType === state.cardmastery.path) {
    const path2Skill = state.cardmastery.skills.path2;

    if (path2Skill.id === "overkill" && state.cardmastery.path === metaType) {
      const skill = cardMasteryTree
        .find((p) => p.level === 2)
        ?.skills.find((s) => s.id === path2Skill.id);
      if (skill) {
        winRate += skill.levels[path2Skill.level - 1].effect / 100;
      }
    }
  }

  return winRate;
}

export function applyCardOrderEffect(
  winRate: number,
  metaType: string,
  gameRound: number,
  state: GameState
) {
  if (metaType === state.cardmastery.path) {
    const path3Skill = state.cardmastery.skills.path3;

    const order = ["first", "second", "third"];

    if (gameRound !== undefined && path3Skill.id === order[gameRound]) {
      const skill = cardMasteryTree
        .find((p) => p.level === 3)
        ?.skills.find((s) => s.id === path3Skill.id);
      if (skill) {
        winRate *= 1 + skill.levels[path3Skill.level - 1].effect / 100;
      }
    }
  }

  return winRate;
}

export function applyCardMasterEffect(
  winRate: number,
  metaType: string,
  state: GameState
) {
  if (metaType === state.cardmastery.path) {
    const path4skill = state.cardmastery.skills.path4;

    if (path4skill) {
      const skill = cardMasteryTree
        .find((p) => p.level === 4)
        ?.skills.find((s) => s.id === path4skill.id);
      if (skill) {
        winRate *= 1 + skill.levels[path4skill.level - 1].effect / 100;
      }
    }
  }

  return winRate;
}
