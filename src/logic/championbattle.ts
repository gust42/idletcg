import { GameState } from "../interfaces/logic";
import { AllChampions } from "../rules/champions";
import { TournamentLog } from "../rules/tournaments/tournament";
import { battle } from "./battle";
import { ChampionBattleMessage, Message } from "./messagehandler";

export function handleChampionBattleMessage(
  m: Message<ChampionBattleMessage>,
  state: GameState
) {
  if (m.message === "championbattle") {
    const champion = AllChampions.find((c) => c.id === m.data.id);
    if (champion) {
      console.log("fighting champion", champion.name);
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

      state.champions[champion.id].lastTournament = log;
    }
  }

  return state;
}
