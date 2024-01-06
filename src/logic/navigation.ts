import { proxy } from "valtio";
import { DeckbuilderTab } from "../pages/deckbuilder/deckbuildertab";
import PacksTab from "../pages/packs/packstab";
import SkillsTab from "../pages/skills/skillstab";
import { TeamTab } from "../pages/team/teamtab";
import { ActiveTournament } from "../pages/tournaments/activetournament";
import { TournamentLog } from "../pages/tournaments/tournamentlog";
import { TournamentTab } from "../pages/tournaments/tournamenttab";
import TradebinderTab from "../pages/tradebinder/tradebindertab";
import { Settings } from "../pages/settings/settings";
import TrophysTab from "../pages/trophys/trophystab";
import { PackPoints } from "../pages/packs/packpoints";
import { CardMastery } from "../pages/deckbuilder/cardmastery";

export type RouteNames =
  | "packstab"
  | "skillstab"
  | "tradebindertab"
  | "tournamentstab"
  | "deckbuildertab"
  | "activetournament"
  | "tournamentlog"
  | "settings";

export type AllSubroutes =
  | SkillsSubroutes
  | TournamentSubroutes
  | DeckbuilderSubroutes
  | PackSubroutes;

export type AllRouteNames = RouteNames | AllSubroutes;

export type SkillsSubroutes = "skills" | "trophys";
export type TournamentSubroutes = "tournaments" | "team";
export type PackSubroutes = "pack" | "packpoints";
export type DeckbuilderSubroutes = "deckbuilder" | "cardmastery";

export type Route = {
  friendlyName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.FunctionComponent<any>;
  routes?: Partial<
    Record<
      AllSubroutes,
      { friendlyName: string; component: React.FunctionComponent }
    >
  >;
};

type RouteConfig = Record<RouteNames, Route>;

export const routeConfig: RouteConfig = {
  packstab: {
    friendlyName: "Packs",
    routes: {
      pack: { friendlyName: "Packs", component: PacksTab },
      packpoints: { friendlyName: "Pack Points", component: PackPoints },
    },
  },
  tradebindertab: {
    friendlyName: "Trade Binder",
    component: TradebinderTab,
  },
  deckbuildertab: {
    friendlyName: "Deck Builder",
    routes: {
      deckbuilder: { friendlyName: "Deck Builder", component: DeckbuilderTab },
      cardmastery: { friendlyName: "Card Mastery", component: CardMastery },
    },
  },
  tournamentstab: {
    friendlyName: "Tournaments",
    routes: {
      tournaments: { friendlyName: "Tournaments", component: TournamentTab },
      team: { friendlyName: "Team", component: TeamTab },
    },
  },
  skillstab: {
    friendlyName: "Player",
    routes: {
      skills: { friendlyName: "Skills", component: SkillsTab },
      trophys: { friendlyName: "Trophys", component: TrophysTab },
    },
  },
  activetournament: {
    friendlyName: "Active tournament",
    component: ActiveTournament,
  },
  tournamentlog: {
    friendlyName: "Tournament log",
    component: TournamentLog,
  },
  settings: {
    friendlyName: "Settings",
    component: Settings,
  },
};

type RouteState = {
  route: AllRouteNames;
  props: Record<string, unknown>;
};

const savedTab = JSON.parse(
  localStorage.getItem("routeState") ?? "{}"
) as RouteState;

export const routeState = proxy<RouteState>({
  route: savedTab?.route ?? "packstab",
  props: savedTab?.props ?? {},
});

export const navigate = (route: AllRouteNames, props = {}) => {
  routeState.route = route;
  routeState.props = props;
  localStorage.setItem("routeState", JSON.stringify({ route, props }));
};

export const findParentRoute = (route: AllSubroutes) => {
  const parentKey = Object.keys(routeConfig).find((key) => {
    const subroute = routeConfig[key as keyof typeof routeConfig].routes;
    return subroute ? Object.keys(subroute).includes(route) : false;
  });

  return parentKey ? routeConfig[parentKey as keyof typeof routeConfig] : null;
};
