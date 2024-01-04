import { routeConfig } from "./../logic/navigation";

export type Tabs =
  | "teamtab"
  | "packstab"
  | "skillstab"
  | "tradebindertab"
  | "tournamentstab"
  | "deckbuildertab";

export type TabConfig = {
  friendlyName: string;
  route: keyof typeof routeConfig;

  tabs?: Record<
    string,
    { friendlyName: string; route: keyof typeof routeConfig }
  >;
};

export const tabs: Record<Tabs, TabConfig> = {
  packstab: {
    friendlyName: "Packs",
    route: "packstab",
  },
  tradebindertab: {
    friendlyName: "Trade Binder",
    route: "tradebindertab",
  },
  deckbuildertab: {
    friendlyName: "Deck Builder",
    route: "deckbuildertab",
  },
  tournamentstab: {
    friendlyName: "Tournaments",
    route: "tournamentstab",
  },
  teamtab: {
    friendlyName: "Team",
    route: "teamtab",
  },
  skillstab: {
    friendlyName: "Player",
    route: "skills",
  },
};
