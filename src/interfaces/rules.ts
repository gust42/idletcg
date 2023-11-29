export type Rule = {
  value: number;
  requirement?: number;
};

export type Card = {
  code: string;
  id: number;
};

export type CostForUniqueCards = {
  increase: number;
  badcards: number;
  goodcards: number;
  metacards: number;
};

export type Rules = {
  PackCost: Rule;
  MetaCardDroprate: Rule;
  GoodCardDroprate: Rule;
  GoodCardPackMax: Rule;
  GoodCardSellValue: Rule;
  BadCardSellValue: Rule;
  MetaCardSellValue: Rule;
  CardsForTradebinder: Rule;
  MoneyForSkills: Rule;
  CostForUniqueCards: CostForUniqueCards;
  TournamentRoundTicks: Rule;
  TickLength: Rule;
  DeckSize: Rule;
};
