import { Counter, Deck, Entity, SkillState, Tab } from "../interfaces/logic";
import { GameStateV2 } from "./v2";

export interface GameStateV3 {
  deck: {
    cards: Deck;
  };
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

export const migrateV3 = (currentState: GameStateV2) => {
  const newState: GameStateV3 = {
    ...currentState,
    deck: {
      cards: {
        slot1: undefined,
        slot2: undefined,
        slot3: undefined,
        slot4: undefined,
        slot5: undefined,
        slot6: undefined,
      },
    },
    tabs: {
      ...currentState.tabs,
      deckbuildertab: {
        acquired: false,
      },
      tournamentstab: {
        acquired: false,
      },
    },
  };
  return newState;
};
