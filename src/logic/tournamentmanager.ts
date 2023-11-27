import { AllTournaments } from "../rules/ruleshandler";
import { Tournaments } from "../rules/tournaments/tournament";
import StateHandler from "../state/statehandler";
import RulesHandler from "./../rules/ruleshandler";

export type TournamentMessages = "entertournament";

export type TournamentData = { id: keyof Tournaments };

export class TournamentManager {
  static messageList: TournamentMessages[] = ["entertournament"];

  private stateHandler: StateHandler;

  private rulesHandler: RulesHandler;

  private tickCounter = 0;

  constructor(stateHandler: StateHandler, rulesHandler: RulesHandler) {
    this.stateHandler = stateHandler;
    this.rulesHandler = rulesHandler;

    this.tickCounter = this.rulesHandler.getRuleValue("TournamentRoundTicks");
  }

  public handleTick() {
    if (
      this.tickCounter < this.rulesHandler.getRuleValue("TournamentRoundTicks")
    ) {
      this.tickCounter++;
      return;
    }
    this.tickCounter = 0;
    const state = this.stateHandler.getState();
    if (state.activities.tournament) {
      const tournament = AllTournaments[state.activities.tournament.id];
      const currentOpponent =
        tournament.opponents[state.activities.tournament.currentOpponent];
      const currentDeck = state.activities.tournament.deck;
      const currentRound = state.activities.tournament.tournamentRound;
      const currentGame = state.activities.tournament.gameRound;

      if (currentRound < tournament.opponents.length) {
        // Play game
        const myCard = currentDeck[
          `slot${currentGame + 1}` as keyof typeof currentDeck
        ] as number;
        const opponentCard = currentOpponent.deck[
          `slot${currentGame + 1}` as keyof typeof currentDeck
        ] as number;
        const myWinRate = Math.abs(
          Math.floor(Math.sin(myCard) * Math.sin(myCard) * 100 - 50)
        );
        const opponentWinRate = Math.abs(
          Math.floor(Math.sin(opponentCard) * Math.sin(opponentCard) * 100 - 50)
        );

        if (myWinRate <= opponentWinRate) {
          console.log(
            "lost game in round",
            state.activities.tournament.gameRound,
            myWinRate,
            opponentWinRate
          );

          state.activities.tournament = undefined;

          this.stateHandler.updateState(state);
          return;
        }

        if (state.activities.tournament.gameRound >= 6) {
          state.activities.tournament.gameRound = 0;
          state.activities.tournament.currentOpponent++;
          state.activities.tournament.tournamentRound++;
        } else {
          state.activities.tournament.gameRound++;
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

        this.stateHandler.updateState(state);

        this.tickCounter = this.rulesHandler.getRuleValue(
          "TournamentRoundTicks"
        );
      }
    }
  }

  public handleMessages(message: TournamentMessages, data: TournamentData) {
    const state = this.stateHandler.getState();
    const tournament = AllTournaments[data.id];

    switch (message) {
      case "entertournament":
        if (state.entities.money.amount < tournament.entryFee) return;
        state.entities.money.amount -= tournament.entryFee;
        state.activities.tournament = {
          id: data.id,
          deck: state.deck.cards,
          currentOpponent: 0,
          gameRound: 0,
          tournamentRound: 0,
        };
        this.stateHandler.updateState(state);
        break;
    }
  }
}
