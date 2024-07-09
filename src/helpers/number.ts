import * as ADNotations from "@antimatter-dimensions/notations";

const scientific = new ADNotations.ScientificNotation();

export function format(number: number, decimals = 0, precision = 2) {
  if (number < 1000000) return number.toFixed(decimals);
  return scientific.format(number, precision, decimals);
}

export function formatOnlyDecimal(number: number, decimals = 2) {
  if (number % 1 === 0) return number;
  return number.toFixed(decimals);
}
