import * as ADNotations from "@antimatter-dimensions/notations";

const scientific = new ADNotations.ScientificNotation();

export function format(number: number, decimals = 0, precision = 2) {
  if (number < 1000000) return number.toFixed(decimals);

  return scientific.format(number, precision, decimals);
}
