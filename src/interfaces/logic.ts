export interface Entity {
  amount: number;
  acquired: boolean;
}

export interface Tab {
  acquired: boolean;
}

export interface SkillState {
  acquired: boolean;
  level: number;
  on?: boolean;
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
  autopackskill: SkillState;
  workskill: SkillState;
  uniquecards: Counter;
}

export interface GameState {
  skills: {
    autoPackSkill: SkillState;
    workSkill: SkillState;
    shopkeeperFriendSkill: SkillState;
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
    deckbuildertab: Tab;
    tournamentstab: Tab;
  };
}
