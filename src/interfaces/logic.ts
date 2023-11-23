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

export interface Counter {
  amount: number;
}

export interface Deck {
  slot1: number | undefined;
  slot2: number | undefined;
  slot3: number | undefined;
  slot4: number | undefined;
  slot5: number | undefined;
  slot6: number | undefined;
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
  deck: {
    cards: Deck;
  };
  tabs: {
    packstab: Tab;
    skillstab: Tab;
    tradebindertab: Tab;
    deckbuildertab: Tab;
    tournamentstab: Tab;
  };
}
