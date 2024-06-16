import { GameState } from "../interfaces/logic";

export function handleActivePackRules(state: GameState) {
  let changed = false;
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
    state.entities.packbonuspoints.amount >= 80
  ) {
    state.pack.good.acquired = true;
    state.routes.packstab.notify = true;
    state.routes.packpoints.notify = true;
    changed = true;
  }

  if (
    !state.pack.meta.acquired &&
    state.entities.packbonuspoints.amount >= 600
  ) {
    state.pack.meta.acquired = true;
    state.routes.packstab.notify = true;
    state.routes.packpoints.notify = true;
    changed = true;
  }

  if (
    !state.entities.packsupply.acquired &&
    (state.entities.packbonuspoints.amount >= 1000 ||
      state.entities.packsupply.amount < 1000)
  ) {
    state.entities.packsupply.acquired = true;
    state.routes.packstab.notify = true;
    state.routes.packpoints.notify = true;
    changed = true;
  }
  return changed;
}
