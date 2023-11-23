import { DeckbuilderTab } from "../pages/deckbuilder/deckbuildertab";
import PacksTab from "../pages/packs/packstab";
import SkillsTab from "../pages/skills/skillstab";
import { TournamentTab } from "../pages/tournaments/tournamenttab";
import TradebinderTab from "../pages/tradebinder/tradebindertab";

export type Tabs =
  | "packstab"
  | "skillstab"
  | "tradebindertab"
  | "tournamentstab"
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
  tradebindertab: {
    friendlyName: "Trade Binder",
    component: TradebinderTab,
  },
  deckbuildertab: {
    friendlyName: "Deck Builder",
    component: DeckbuilderTab,
  },
  tournamentstab: {
    friendlyName: "Tournaments",
    component: TournamentTab,
  },
  skillstab: {
    friendlyName: "Skills",
    component: SkillsTab,
  },
};
