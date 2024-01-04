import { AllRouteNames, routeConfig } from "./../logic/navigation";

export type Tabs =
  | "packstab"
  | "skillstab"
  | "tradebindertab"
  | "tournamentstab"
  | "deckbuildertab";

export type TabConfig = {
  friendlyName: string;
  route: AllRouteNames;

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
    route: "tournaments",
  },
  skillstab: {
    friendlyName: "Player",
    route: "skills",
  },
};
