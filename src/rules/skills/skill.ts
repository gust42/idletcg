export type Skills = {
  autoPackSkill: SkillRule;
  workSkill: SkillRule;
  shopkeeperFriendSkill: SkillRule;
};

export type SkillRule = {
  value: number;
  requirement: number;
  increase: number;
  increaseEffect: number;
};
export interface Skill {
  rule: SkillRule;

  title: string;

  description: string;

  cost(level: number): number;

  effect(level: number): number;

  friendyEffect(level: number): string;
}
