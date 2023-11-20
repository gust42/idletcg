export type Rule = {
  value: number;
  requirement?: number;
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
  CardsforSkills: Rule;
  AutoPackSkill: Rule;
  WorkSkill: Rule;
  CostForUniqueCards: CostForUniqueCards;
};
