import { AllTournaments } from "../rules/ruleshandler";
import {
  TournamentLog,
  Tournaments,
  generateWinRatio,
} from "../rules/tournaments/tournament";
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
    if (state.activities.tournament && state.logs.tournament) {
      const tournament = AllTournaments[state.activities.tournament.id];
      const currentRound = state.activities.tournament.tournamentRound;

      if (currentRound < tournament.opponents.length) {
        // Play game

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

        if (state.logs.tournament.points >= 12) {
          state.entities.money.amount += tournament.reward;
        } else if (state.logs.tournament.points >= 9) {
          state.entities.money.amount += tournament.reward / 2;
        }

        state.activities.tournament = undefined;

        this.stateHandler.updateState(state);

        this.tickCounter = this.rulesHandler.getRuleValue(
          "TournamentRoundTicks"
        );
      }
    }
  }

  public runTournament(id: keyof Tournaments) {
    const tournament = AllTournaments[id];

    const state = this.stateHandler.getState();
    if (state.activities.tournament) {
      const currentDeck = state.activities.tournament.deck;

      const log: TournamentLog = {
        rounds: [],
        points: 0,
        myDeck: currentDeck,
      };

      for (let i = 0; i < tournament.opponents.length; i++) {
        const currentOpponent = tournament.opponents[i];

        let wins = 0;
        for (let j = 0; j < 6; j++) {
          const myCard = currentDeck[
            `slot${j + 1}` as keyof typeof currentDeck
          ] as number;
          const opponentCard = currentOpponent.deck[
            `slot${j + 1}` as keyof typeof currentDeck
          ] as number;
          const myWinRate = generateWinRatio(myCard);
          const opponentWinRate = generateWinRatio(opponentCard);

          console.log(myWinRate, opponentWinRate);

          if (myWinRate > opponentWinRate) {
            wins++;
          }
        }

        const result = wins > 3 ? "win" : wins < 3 ? "loss" : "draw";

        if (result === "win") {
          log.points += 3;
        } else if (result === "draw") {
          log.points += 1;
        }

        log.rounds.push({
          result: result,
          points: log.points,
          opponentDeck: currentOpponent.deck,
        });
      }
      state.logs.tournament = log;
      this.stateHandler.updateState(state);
      console.log(log);
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

        this.runTournament(data.id);
        break;
    }
  }
}
