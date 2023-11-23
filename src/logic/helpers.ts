export function roundToNearestThousand(num: number): number {
  return Math.round(num / 1000) * 1000;
}

export const allCards = Array.from({ length: 256 }, (_v, k) => ({
  id: k,
  code: (k + 9728).toString(16),
}));
