export interface Card {
  amount: number;
  acquired: boolean;
}

export interface Tab {
  acquired: boolean;
}

export interface Skill {
  acquired: boolean;
}

interface Counter {
  amount: number;
}

export interface GameState {
  badcards: Card;
  goodcards: Card;
  metacards: Card;
  money: Card;
  packstab: Tab;
  skillstab: Tab;
  tradebindertab: Tab;
  tournamentstab: Tab;
  autopackskill: Skill;
  workskill: Skill;
  uniquecards: Counter;
}
