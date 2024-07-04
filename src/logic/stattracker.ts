import { GameState } from "../interfaces/logic";

export class StatTracker {
  public static tick(state: GameState) {
    state.stats.highestBadcards = Math.max(
      state.stats.highestBadcards,
      state.entities.badcards.amount
    );
    state.stats.highestGoodcards = Math.max(
      state.stats.highestGoodcards,
      state.entities.goodcards.amount
    );
    state.stats.highestMetacards = Math.max(
      state.stats.highestMetacards,
      state.entities.metacards.amount
    );
  }
}
