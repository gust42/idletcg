import { ReactNode } from "react";
import { DeckbuilderTab } from "../pages/deckbuilder/deckbuildertab";
import PacksTab from "../pages/packs/packstab";
import SkillsTab from "../pages/skills/skillstab";
import { TournamentTab } from "../pages/tournaments/tournamenttab";
import TradebinderTab from "../pages/tradebinder/tradebindertab";
import { TeamTab } from "../pages/team/teamtab";

export type Tabs =
  | "teamtab"
  | "packstab"
  | "skillstab"
  | "tradebindertab"
  | "tournamentstab"
  | "deckbuildertab";

export type TabRule = {
  friendlyName: string;
  component: () => ReactNode;
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
  teamtab: {
    friendlyName: "Team",
    component: TeamTab,
  },
  skillstab: {
    friendlyName: "Skills",
    component: SkillsTab,
  },
};
