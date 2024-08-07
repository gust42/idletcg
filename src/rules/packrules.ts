import { GameState } from "../interfaces/logic";
import { isRowUnlocked } from "../logic/uniquecardhandler";
import RulesHandler from "./ruleshandler";

export function handleActivePackRules(
  rulesHandler: RulesHandler,
  state: GameState
) {
  let changed = false;

  // First
  if (
    !state.entities.packbonuspoints.acquired &&
    state.entities.packbonuspoints.amount > 10
  ) {
    state.entities.packbonuspoints.acquired = true;
    changed = true;
  }

  if (
    !state.routes.packpoints.acquired &&
    state.entities.packbonuspoints.amount > 30
  ) {
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
    (isRowUnlocked(4, state) || state.entities.packsupply.amount < 10000)
  ) {
    state.entities.packsupply.acquired = true;
    state.routes.packstab.notify = true;
    state.routes.packpoints.notify = true;
    changed = true;
  }
  return changed;
}
