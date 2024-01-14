declare module "@antimatter-dimensions/notations" {
  export class ScientificNotation {
    public format(
      number: number | string,
      decimals: number,
      decimalsUnder1000: number
    ): string;
  }
}
