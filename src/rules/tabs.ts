import { DeckbuilderTab } from "../pages/deckbuilder/deckbuildertab";
import PacksTab from "../pages/packs/packstab";
import SkillsTab from "../pages/skills/skillstab";
import TradebinderTab from "../pages/tradebinder/tradebindertab";

export type Tabs =
  | "packstab"
  | "skillstab"
  | "tradebindertab"
  | "deckbuildertab";

export type TabRule = {
  friendlyName: string;
  component: React.ComponentType;
};

export const tabs: Record<Tabs, TabRule> = {
  packstab: {
    friendlyName: "Packs",
    component: PacksTab,
  },
  skillstab: {
    friendlyName: "Skills",
    component: SkillsTab,
  },
  tradebindertab: {
    friendlyName: "Trade Binder",
    component: TradebinderTab,
  },
  deckbuildertab: {
    friendlyName: "Deck Builder",
    component: DeckbuilderTab,
  },
};
