import {
  GameStateV1,
  Counter,
  SkillState,
  Entity,
  Tab,
} from "../interfaces/logic";

export interface GameStateV2 {
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
  };
}

export const migrateV2 = (currentState: GameStateV1) => {
  const newState: GameStateV2 = {
    skills: {
      autoPackSkill: {
        acquired: currentState.autopackskill.acquired,
        level: 1,
        on: true,
      },
      workSkill: {
        acquired: currentState.workskill.acquired,
        level: 1,
      },
      shopkeeperFriendSkill: {
        acquired: false,
        level: 1,
      },
    },
    tabs: {
      packstab: {
        acquired: currentState.packstab.acquired,
      },
      skillstab: {
        acquired: currentState.skillstab.acquired,
      },
      tradebindertab: {
        acquired: currentState.tradebindertab.acquired,
      },
      deckbuildertab: {
        acquired: currentState.uniquecards.amount > 5,
      },
    },
    entities: {
      badcards: {
        amount: currentState.badcards.amount,
        acquired: currentState.badcards.acquired,
      },
      goodcards: {
        amount: currentState.goodcards.amount,
        acquired: currentState.goodcards.acquired,
      },
      metacards: {
        amount: currentState.metacards.amount,
        acquired: currentState.metacards.acquired,
      },
      money: {
        amount: currentState.money.amount,
        // amount: 500000,
        acquired: currentState.money.acquired,
      },
    },
    counters: {
      uniquecards: {
        amount: currentState.uniquecards.amount,
      },
    },
  };

  console.log("migrating to v2");
  return newState;
};
