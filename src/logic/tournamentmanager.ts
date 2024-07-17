import { Deck, GameState } from "../interfaces/logic";
import { AllTournaments } from "../rules/ruleshandler";
import { AllTeamMembers } from "../rules/teammembers";
import {
  Tournament,
  TournamentLog,
  Tournaments,
} from "../rules/tournaments/tournament";
import StateHandler from "../state/statehandler";
import RulesHandler from "./../rules/ruleshandler";
import { battle } from "./battle";
import {
  addTeamMember,
  calculateEloRating,
  isPersonalAssistantAllowedToRun,
} from "./helpers";
import {
  calculateTotalTournamentTime,
  calculateTournamentRoundTime,
} from "./helpers/tournamenttime";
import { AssignTournamentMessage, TournamentMessage } from "./messagehandler";

export type TournamentMessages =
  | "entertournament"
  | "assigntournament"
  | "personalAssistantTournament";

export class TournamentManager {
  static messageList: TournamentMessages[] = [
    "entertournament",
    "assigntournament",
    "personalAssistantTournament",
  ];

  private stateHandler: StateHandler;

  private rulesHandler: RulesHandler;

  private _tickCounter = 0;

  public get tickCounter() {
    return this._tickCounter;
  }

  constructor(stateHandler: StateHandler, rulesHandler: RulesHandler) {
    this.stateHandler = stateHandler;
    this.rulesHandler = rulesHandler;
  }

  public handleTick() {
    this.handleTeamMemberTick();
    this.handlePersonalAssistant();

    const state = this.stateHandler.getState();

    const tournamentRoundTime = calculateTournamentRoundTime(state);

    if (!state.activities.tournament) return;

    if (this.tickCounter < tournamentRoundTime - 1) {
      this._tickCounter++;
      return;
    }
    this._tickCounter = 0;

    const deckSize = this.rulesHandler.getRuleValue("DeckSize");

    if (state.logs.tournament[state.activities.tournament.id]) {
      const tournament = AllTournaments[state.activities.tournament.id];
      const currentRound = state.activities.tournament.tournamentRound;
      const log = state.logs.tournament[state.activities.tournament.id];

      if (currentRound < tournament.opponents.length) {
        // Play game

        state.activities.tournament.gameRoundStartTime =
          state.counters.clock.amount;

        if (state.activities.tournament.gameRound >= deckSize) {
          state.activities.tournament.gameRound = 0;
          state.activities.tournament.currentOpponent++;
          state.activities.tournament.tournamentRound++;

          if (
            state.activities.tournament.currentOpponent >=
            tournament.opponents.length
          ) {
            this.endTournament(tournament, log, state);
          }
        } else state.activities.tournament.gameRound++;
      }
      this.stateHandler.updateState(state);
    }
  }

  private endTournament(
    tournament: Tournament,
    log: TournamentLog,
    state: GameState
  ) {
    tournament.giveReward(log.points, state);
    if (log.points >= tournament.opponents.length * 3) {
      state.trophys[state.activities.tournament!.id]++;
      state.entities.trophies.amount++;
      if (!state.entities.trophies.acquired)
        state.entities.trophies.acquired = true;
    }
    if (log.points >= tournament.opponents.length * 3)
      addTeamMember(state, tournament.teammember);

    state.entities.rating.amount = this.updateRating(
      log.points,
      tournament.ratingRequirement,
      state.entities.rating.amount
    );
    if (!state.entities.rating.acquired) state.entities.rating.acquired = true;

    state.logs.tournamentHistory[state.activities.tournament!.id] = log;
    state.activities.tournament = undefined;
  }

  private updateRating(
    points: number,
    tournamentRating: number,
    rating: number
  ) {
    let newRating = rating;
    if (points > 0) {
      newRating = calculateEloRating(rating, tournamentRating, points);
    }
    return newRating;
  }

  private handleTeamMemberTick() {
    const state = this.stateHandler.getState();
    const deckSize = this.rulesHandler.getRuleValue("DeckSize");

    state.team.forEach((t) => {
      const fullDeck =
        Object.values(t.deck).every((card) => card !== undefined) &&
        Object.keys(t.deck).length >= deckSize;
      if (!fullDeck) {
        t.currentTournament = undefined;
        t.tournamentTicks = 0;
        return;
      }
      const member = AllTeamMembers.find((m) => m.name === t.name)!;
      if (t.currentTournament) {
        const ticks = t.tournamentTicks as number;
        const totalTicks = calculateTotalTournamentTime(
          t.currentTournament,
          member.speed
        );
        if (totalTicks - ticks <= 0) {
          // Run tournament
          const log = this.runTournament(t.currentTournament, t.deck);
          const tournament = AllTournaments[t.currentTournament];

          tournament.giveReward(log.points, state);

          const maxPoints = tournament.opponents.length * deckSize;

          t.rating = this.updateRating(
            log.points,
            tournament.ratingRequirement,
            t.rating
          );
          if (log.points >= maxPoints) {
            if (!t.trophies) t.trophies = 0;
            t.trophies++;
          }
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
      battle(currentDeck, currentOpponent.deck, log, deckSize);
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
      case "personalAssistantTournament":
        this.setPersonalAssistantTournament(data as AssignTournamentMessage);
        break;
    }
  }

  private setPersonalAssistantTournament(data: AssignTournamentMessage) {
    const state = this.stateHandler.getState();
    state.trackers.personalAssistantTournament = data.id;
    this.stateHandler.updateState(state);
  }

  private enterTournament(data: TournamentMessage) {
    const state = this.stateHandler.getState();
    const deckSize = this.rulesHandler.getRuleValue("DeckSize");
    if (!data.id) return;
    const tournament = AllTournaments[data.id];

    const fullDeck =
      Object.values(state.deck.cards).every((card) => card !== undefined) &&
      Object.keys(state.deck.cards).length >= deckSize;

    if (!fullDeck) return;

    if (state.activities.tournament !== undefined) return;

    if (state.entities.money.amount < tournament.entryFee) return;
    state.entities.money.amount -= tournament.entryFee;
    state.activities.tournament = {
      id: data.id,
      deck: { ...state.deck.cards },
      currentOpponent: 0,
      gameRound: 0,
      tournamentRound: 0,
      gameRoundStartTime: state.counters.clock.amount - 1,
    };

    this._tickCounter = 0;

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

  private handlePersonalAssistant() {
    const state = this.stateHandler.getState();
    if (
      state.skills.personalAssistant.acquired &&
      state.trackers.personalAssistantTournament
    ) {
      if (
        isPersonalAssistantAllowedToRun(
          state,
          state.trackers.personalAssistantTournament
        )
      ) {
        this.enterTournament({
          id: state.trackers.personalAssistantTournament,
        });
      }
    }
  }
}
