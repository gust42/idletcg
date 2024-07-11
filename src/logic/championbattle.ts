import { GameState } from "../interfaces/logic";
import { AllChampions } from "../rules/champions";
import { TournamentLog } from "../rules/tournaments/tournament";
import { battle } from "./battle";
import GameLoop from "./gameloop";
import { ChampionBattleMessage, Message } from "./messagehandler";

export function handleChampionBattleMessage(
  m: Message<ChampionBattleMessage>,
  state: GameState
) {
  if (m.message === "championbattle") {
    const champion = AllChampions.find((c) => c.id === m.data.id);
    const cost =
      GameLoop.getInstance().rulesHandler.getRuleValue("ChampionBattleCost");
    if (champion && state.entities.trophies.amount >= cost) {
      const log: TournamentLog = {
        id: champion.id,
        rounds: [],
        points: 0,
        myDeck: { ...state.deck.championDeck },
      };
      battle(
        state.deck.championDeck,
        champion.deck,
        log,
        Object.keys(state.deck.championDeck).length
      );

      state.entities.trophies.amount -= cost;

      state.champions[champion.id].lastTournament = log;

      state.activities.champion = {
        id: champion.id,
        deck: { ...state.deck.cards },
        gameRound: 0,
      };
    }
  }

  return state;
}

export function handleChampionBattleTick() {
  const state = GameLoop.getInstance().stateHandler.getState();
  if (state.activities.champion) {
    const champion = AllChampions.find(
      (c) => c.id === state.activities.champion!.id
    );
    if (champion) {
      const log = state.champions[champion.id].lastTournament;
      if (log) {
        if (
          state.activities.champion.gameRound < Object.keys(log.myDeck).length
        ) {
          state.activities.champion.gameRound++;
        } else {
          state.activities.champion = undefined;
          if (log.points === 3) {
            state.champions[champion.id].defeated = true;
          }
        }
      }
    }
  }

  GameLoop.getInstance().stateHandler.updateState(state);
}
