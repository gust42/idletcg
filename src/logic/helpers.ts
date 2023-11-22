export function roundToNearestThousand(num: number): number {
  return Math.round(num / 1000) * 1000;
}

export const rangeEmojis = Array.from({ length: 256 }, (_v, k) =>
  (k + 9728).toString(16)
);
