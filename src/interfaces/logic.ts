export interface Entity {
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

export interface GameStateV1 {
  badcards: Entity;
  goodcards: Entity;
  metacards: Entity;
  money: Entity;
  packstab: Tab;
  skillstab: Tab;
  tradebindertab: Tab;
  tournamentstab: Tab;
  autopackskill: Skill;
  workskill: Skill;
  uniquecards: Counter;
}

export interface GameState {
  skills: {
    autopackskill: Skill;
    workskill: Skill;
  };
  entities: {
    badcards: Entity;
    goodcards: Entity;
    metacards: Entity;
    money: Entity;
  };
  counters: {
    uniquecards: Counter;
  };
  tabs: {
    packstab: Tab;
    skillstab: Tab;
    tradebindertab: Tab;
    tournamentstab: Tab;
  };
}
