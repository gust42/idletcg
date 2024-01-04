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

export type Route = {
  friendlyName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component?: React.FunctionComponent<any>;
  routes?: Record<
    string,
    { friendlyName: string; component: React.FunctionComponent }
  >;
};

type RouteConfig = Record<string, Route>;

export const routeConfig: RouteConfig = {
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
  route: keyof typeof routeConfig;
  props: Record<string, unknown>;
};

const savedTab = JSON.parse(
  localStorage.getItem("routeState") ?? "{}"
) as RouteState;

export const routeState = proxy<RouteState>({
  route: savedTab?.route ?? "packstab",
  props: savedTab?.props ?? {},
});

export const navigate = (route: keyof typeof routeConfig, props = {}) => {
  routeState.route = route;
  routeState.props = props;
  localStorage.setItem("routeState", JSON.stringify({ route, props }));
};

export const findParentRoute = (route: string) => {
  const parentKey = Object.keys(routeConfig).find((key) => {
    const subroute = routeConfig[key as keyof typeof routeConfig].routes;
    return subroute ? Object.keys(subroute).includes(route) : false;
  });

  return parentKey ? routeConfig[parentKey as keyof typeof routeConfig] : null;
};
