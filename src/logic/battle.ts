import { Deck } from "../interfaces/logic";
import {
  TournamentLog,
  calculateWinner,
} from "../rules/tournaments/tournament";
import { BattleCard } from "./battleCard";
import GameLoop from "./gameloop";

export function battle(
  myDeck: Deck,
  opponentDeck: Deck,
  log: TournamentLog,
  deckSize: number
) {
  let wins = 0;
  const state = GameLoop.getInstance().stateHandler.getState();
  for (let j = 0; j < deckSize; j++) {
    const key = `slot${j + 1}` as keyof typeof myDeck;
    const myCard = new BattleCard(myDeck[key] as number, state);
    const opponentCard = opponentDeck[key] as number;

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
    points: result === "win" ? 3 : result === "draw" ? 1 : 0,
    opponentDeck,
  });
}
