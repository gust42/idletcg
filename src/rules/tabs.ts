import { RouteNames } from "./../logic/navigation";

export type Tabs =
  | "packstab"
  | "skillstab"
  | "tradebindertab"
  | "tournamentstab"
  | "deckbuildertab";

export type TabConfig = {
  friendlyName: string;
  route: RouteNames;
};

export const tabs: Record<Tabs, TabConfig> = {
  packstab: {
    friendlyName: "Packs",
    route: "packstab",
  },
  tradebindertab: {
    friendlyName: "Binder",
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
  skillstab: {
    friendlyName: "Player",
    route: "skillstab",
  },
};
