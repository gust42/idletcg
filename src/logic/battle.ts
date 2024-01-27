import { Deck } from "../interfaces/logic";
import {
  TournamentLog,
  calculateWinner,
} from "../rules/tournaments/tournament";
import GameLoop from "./gameloop";

export function battle(
  myDeck: Deck,
  opponentDeck: Deck,
  log: TournamentLog,
  deckSize: number
) {
  let wins = 0;
  for (let j = 0; j < deckSize; j++) {
    const key = `slot${j + 1}` as keyof typeof myDeck;
    const myCard = myDeck[key] as number;
    const opponentCard = opponentDeck[key] as number;

    const result = calculateWinner(
      myCard,
      opponentCard,
      GameLoop.getInstance().stateHandler.getState()
    );
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
    opponentDeck,
  });
}
