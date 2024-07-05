import { GameState } from "../interfaces/logic";
import RulesHandler from "./ruleshandler";

export function handleActivePackRules(
  rulesHandler: RulesHandler,
  state: GameState
) {
  let changed = false;

  // First
  if (
    !state.entities.packbonuspoints.acquired &&
    state.entities.packbonuspoints.amount > 40
  ) {
    state.entities.packbonuspoints.acquired = true;
    state.routes.packpoints.acquired = true;
    state.routes.packstab.notify = true;
    state.routes.packpoints.notify = true;
    changed = true;
  }

  if (
    !state.pack.good.acquired &&
    state.entities.packbonuspoints.amount >=
      rulesHandler.getRuleValue("GoodUnlock")
  ) {
    state.pack.good.acquired = true;
    state.routes.packstab.notify = true;
    state.routes.packpoints.notify = true;
    changed = true;
  }

  if (
    !state.pack.meta.acquired &&
    state.entities.packbonuspoints.amount >=
      rulesHandler.getRuleValue("MetaUnlock")
  ) {
    state.pack.meta.acquired = true;
    state.routes.packstab.notify = true;
    state.routes.packpoints.notify = true;
    changed = true;
  }

  if (
    !state.entities.packsupply.acquired &&
    (state.counters.uniquecards.amount > 0 ||
      state.entities.packsupply.amount < 10000)
  ) {
    state.entities.packsupply.acquired = true;
    state.routes.packstab.notify = true;
    state.routes.packpoints.notify = true;
    changed = true;
  }
  return changed;
}
