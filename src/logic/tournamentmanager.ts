import { AllTournaments } from "../rules/ruleshandler";
import { Tournaments } from "../rules/tournaments/tournament";
import StateHandler from "../state/statehandler";

export type TournamentMessages = "entertournament";

export type TournamentData = { id: keyof Tournaments };

export class TournamentManager {
  static messageList: TournamentMessages[] = ["entertournament"];

  private stateHandler: StateHandler;

  constructor(stateHandler: StateHandler) {
    this.stateHandler = stateHandler;
  }

  public handleTick() {
    const state = this.stateHandler.getState();
    if (state.activities.tournament) {
      const tournament = AllTournaments[state.activities.tournament.id];
      // const currentOpponent =
      //   tournament.opponents[state.activities.tournament.currentOpponent];
      // const currentDeck = state.activities.tournament.deck;
      const currentRound = state.activities.tournament.tournamentRound;
      const currentGame = state.activities.tournament.gameRound;

      if (currentRound < tournament.opponents.length) {
        // Play game
        console.log("playing round", currentRound, "game", currentGame);
        state.activities.tournament.gameRound++;
        if (state.activities.tournament.gameRound >= 6) {
          state.activities.tournament.gameRound = 0;
          state.activities.tournament.currentOpponent++;
          state.activities.tournament.tournamentRound++;
        }
        this.stateHandler.updateState(state);
      } else {
        // End tournament
        if (state.activities.tournament.tournamentRound === 4) {
          // Win tournament
          console.log("won tournament");
          state.entities.money.amount += tournament.reward;
        } else if (state.activities.tournament.tournamentRound === 3) {
          console.log("second place");
          state.entities.money.amount += tournament.reward / 2;
        }

        console.log(
          "lost tournament",
          state.activities.tournament.tournamentRound
        );

        state.activities.tournament = undefined;
      }
    }
  }

  public handleMessages(message: TournamentMessages, data: TournamentData) {
    const deck = this.stateHandler.getState().deck.cards;

    switch (message) {
      case "entertournament":
        this.stateHandler.updateState({
          activities: {
            tournament: {
              id: data.id,
              deck,
              currentOpponent: 0,
              gameRound: 0,
              tournamentRound: 0,
            },
          },
        });
        break;
    }
  }
}
