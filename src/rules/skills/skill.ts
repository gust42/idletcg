import { GameState } from "../../interfaces/logic";

export type Skills = {
  autoPackSkill: SkillRule;
  workSkill: SkillRule;
  shopkeeperFriendSkill: SkillRule;
  tournamentGrinder: SkillRule;
  teamPractice: SkillRule;
  personalAssistant: SkillRule;
};

export type SkillRule = {
  value: number;
  requirement: number;
  increase: number;
  increaseEffect: number;
  maxLevel?: number;
};
export interface Skill {
  rule: SkillRule;

  title: string;

  description: string;

  cost(level: number): number;

  effect(level: number): number;

  friendyEffect(level: number): string;

  visible(state: GameState): boolean;

  isTransformed(state: GameState): boolean;
}
