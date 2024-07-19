import { GameState, Synergy } from "../../interfaces/logic";
import { AddSynergyMessage } from "../messagehandler";
import { BaseEffect, InvertEffect, OtherEffect } from "./effect";

export type Postion = "base" | "enabler" | "payoff";

export function handleSynergyMessage(
  message: AddSynergyMessage,
  state: GameState
) {
  const synergy = state.synergy.find((s) => s.id === message.id);
  if (!synergy) {
    return;
  }

  switch (message.position) {
    case "base":
      synergy.base = message.cardId;
      break;
    case "enabler":
      synergy.enabler = message.cardId;
      break;
    case "payoff":
      synergy.payoff = message.cardId;
      break;
  }

  return state;
}

export function unlockSynergy(state: GameState) {
  let changed = false;
  if (state.entities.rating.amount > 1000 && state.synergy.length === 0) {
    state.synergy.push({
      id: 0,
      base: undefined,
      enabler: undefined,
      payoff: undefined,
    });

    changed = true;
  }

  if (state.entities.rating.amount > 1500 && state.synergy.length === 1) {
    state.synergy.push({
      id: 1,
      base: undefined,
      enabler: undefined,
      payoff: undefined,
    });

    changed = true;
  }

  if (state.entities.rating.amount > 2000 && state.synergy.length === 2) {
    state.synergy.push({
      id: 2,
      base: undefined,
      enabler: undefined,
      payoff: undefined,
    });

    changed = true;
  }

  if (state.entities.rating.amount > 2500 && state.synergy.length === 3) {
    state.synergy.push({
      id: 3,
      base: undefined,
      enabler: undefined,
      payoff: undefined,
    });

    changed = true;
  }

  return changed;
}

const effects = [
  BaseEffect,
  BaseEffect,
  BaseEffect,
  BaseEffect,
  BaseEffect,
  InvertEffect,
  OtherEffect,
  BaseEffect,
  BaseEffect,
  BaseEffect,
];

export function calculateEffect(synergy: Synergy) {
  if (synergy.base && synergy.enabler && synergy.payoff) {
    const total = synergy.base + synergy.enabler + synergy.payoff;
    // const increase = 1 + (synergy.enabler + synergy.payoff / 2) / 100;
    const effect = new effects[total % effects.length](synergy);
    return effect.description + " " + effect.effect();
  }

  return "";
}
