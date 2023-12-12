import { proxy } from "valtio";
import { DeckbuilderTab } from "../pages/deckbuilder/deckbuildertab";
import PacksTab from "../pages/packs/packstab";
import SkillsTab from "../pages/skills/skillstab";
import { TeamTab } from "../pages/team/teamtab";
import { ActiveTournament } from "../pages/tournaments/activetournament";
import { TournamentLog } from "../pages/tournaments/tournamentlog";
import { TournamentTab } from "../pages/tournaments/tournamenttab";
import TradebinderTab from "../pages/tradebinder/tradebindertab";

type RouteConfig = {
  [key: string]: {
    friendlyName: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    component: React.FunctionComponent<any>;
  };
};

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
  activetournament: {
    friendlyName: "Active tournament",
    component: ActiveTournament,
  },
  tournamentlog: {
    friendlyName: "Tournament log",
    component: TournamentLog,
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
