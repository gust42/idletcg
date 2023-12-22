import { Deck } from "../interfaces/logic";
import { AllSkills, AllTournaments } from "../rules/ruleshandler";
import {
  TournamentLog,
  Tournaments,
  calculateWinner,
} from "../rules/tournaments/tournament";
import StateHandler from "../state/statehandler";
import RulesHandler from "./../rules/ruleshandler";
import {
  calculateTotalTournamentTime,
  getTournamentPrizeMoney,
} from "./helpers";
import { AssignTournamentMessage, TournamentMessage } from "./messagehandler";

export type TournamentMessages = "entertournament" | "assigntournament";

export class TournamentManager {
  static messageList: TournamentMessages[] = [
    "entertournament",
    "assigntournament",
  ];

  private stateHandler: StateHandler;

  private rulesHandler: RulesHandler;

  private tickCounter = 0;

  constructor(stateHandler: StateHandler, rulesHandler: RulesHandler) {
    this.stateHandler = stateHandler;
    this.rulesHandler = rulesHandler;

    this.tickCounter = this.rulesHandler.getRuleValue("TournamentRoundTicks");
  }

  public handleTick() {
    this.handleTeamMemberTick();

    const state = this.stateHandler.getState();
    const skill = AllSkills.tournamentGrinder;
    
    if (
      this.tickCounter <
      this.rulesHandler.getRuleValue("TournamentRoundTicks") -
        skill.effect(state.skills.tournamentGrinder.level)
    ) {
      this.tickCounter++;
      return;
    }
    this.tickCounter = 0;

    const deckSize = this.rulesHandler.getRuleValue("DeckSize");

    if (
      state.activities.tournament &&
      state.logs.tournament[state.activities.tournament.id]
    ) {
      const tournament = AllTournaments[state.activities.tournament.id];
      const currentRound = state.activities.tournament.tournamentRound;
      const log = state.logs.tournament[state.activities.tournament.id];

      if (currentRound < tournament.opponents.length) {
        // Play game

        if (state.activities.tournament.gameRound >= deckSize) {
          state.activities.tournament.gameRound = 0;
          state.activities.tournament.currentOpponent++;
          state.activities.tournament.tournamentRound++;
        } else {
          state.activities.tournament.gameRound++;
        }
        this.stateHandler.updateState(state);
      } else {
        // End tournament

        const prizeMoney = getTournamentPrizeMoney(
          state.activities.tournament.id,
          log
        );
        state.entities.money.amount += prizeMoney;
        if(log.points >= tournament.opponents.length * 3){
          state.trophys[state.activities.tournament.id] ++;
        }
        if (
          log.points >= tournament.opponents.length * 3 &&
          !state.team.find((t) => t.name === tournament.teammember.name)
        )
          state.team.push(tournament.teammember);

        state.entities.rating.amount += log.points;
        if (!state.entities.rating.acquired)
          state.entities.rating.acquired = true;

        state.activities.tournament = undefined;

        this.stateHandler.updateState(state);

        this.tickCounter = this.rulesHandler.getRuleValue(
          "TournamentRoundTicks"
        );
      }
    }
  }

  private handleTeamMemberTick() {
    const state = this.stateHandler.getState();

    state.team.forEach((t) => {
      if (t.currentTournament) {
        const ticks = t.tournamentTicks as number;
        const totalTicks = calculateTotalTournamentTime(
          t.currentTournament,
          1 + t.speed
        );
        if (totalTicks - ticks <= 0) {
          // Run tournament
          const log = this.runTournament(t.currentTournament, t.deck);

          const prizeMoney = getTournamentPrizeMoney(t.currentTournament, log);
          state.entities.money.amount += prizeMoney;

          t.rating += log.points;
          t.tournamentTicks = 0;
          t.lastTournament = log;
        } else {
          t.tournamentTicks = ticks + 1;
        }
      }
    });

    this.stateHandler.updateState(state);
  }

  public runTournament(id: keyof Tournaments, currentDeck: Deck) {
    const tournament = AllTournaments[id];

    const deckSize = this.rulesHandler.getRuleValue("DeckSize");

    const log: TournamentLog = {
      id,
      rounds: [],
      points: 0,
      myDeck: { ...currentDeck },
    };

    for (let i = 0; i < tournament.opponents.length; i++) {
      const currentOpponent = tournament.opponents[i];

      let wins = 0;
      for (let j = 0; j < deckSize; j++) {
        const myCard = currentDeck[
          `slot${j + 1}` as keyof typeof currentDeck
        ] as number;
        const opponentCard = currentOpponent.deck[
          `slot${j + 1}` as keyof typeof currentDeck
        ] as number;

        const result = calculateWinner(myCard, opponentCard);
        if (result === "win") {
          wins++;
        } else if (result === "loss") {
          wins--;
        }
      }

      const result = wins > 0 ? "win" : wins < 0 ? "loss" : "draw";

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

    return log;
  }

  public handleMessages(
    message: TournamentMessages,
    data: TournamentMessage | AssignTournamentMessage
  ) {
    switch (message) {
      case "entertournament":
        this.enterTournament(data as TournamentMessage);
        break;
      case "assigntournament":
        this.assignTeamMemberToTournament(data as AssignTournamentMessage);
        break;
    }
  }

  private enterTournament(data: TournamentMessage) {
    const state = this.stateHandler.getState();
    const tournament = AllTournaments[data.id];

    if (state.entities.money.amount < tournament.entryFee) return;
    state.entities.money.amount -= tournament.entryFee;
    state.activities.tournament = {
      id: data.id,
      deck: { ...state.deck.cards },
      currentOpponent: 0,
      gameRound: 0,
      tournamentRound: 0,
    };

    state.logs.tournament[state.activities.tournament.id] = this.runTournament(
      data.id,
      state.activities.tournament.deck
    );
    this.stateHandler.updateState(state);
  }

  private assignTeamMemberToTournament(data: AssignTournamentMessage) {
    const state = this.stateHandler.getState();

    const person = state.team.find((t) => t.name === data.person);
    if (person) {
      person.currentTournament = data.id;
      person.tournamentTicks = 0;
    }

    this.stateHandler.updateState(state);
  }
}
