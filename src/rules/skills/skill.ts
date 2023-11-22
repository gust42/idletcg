import { SkillRule } from "../../interfaces/rules";

export interface Skill {
  rule: SkillRule;

  title: string;

  description: string;

  cost(level: number): number;

  effect(level: number): number;
}
