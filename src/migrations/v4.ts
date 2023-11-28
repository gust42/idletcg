import { GameState } from "../interfaces/logic";
import { GameStateV2 } from "./v2";

export const migrateV4 = (currentState: GameStateV2) => {
  const newState: GameState = {
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
    activities: {},
    logs: {},
  };
  return newState;
};
