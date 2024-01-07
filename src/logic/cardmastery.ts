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

        const pathLevel = path?.level === 1 ? "path1" : "path2";
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
    state.cardmastery.skills.path1.id = undefined;
    state.cardmastery.skills.path1.level = 0;
    state.cardmastery.skills.path2.id = undefined;
    state.cardmastery.skills.path2.level = 0;
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
