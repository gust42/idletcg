import { useSnapshot } from "valtio";
import useGameState from "../hooks/usegamestate";
import MessageHandler, { NotifierMessage } from "../logic/messagehandler";
import {
  AllRouteNames,
  AllSubroutes,
  Route,
  RouteNames,
  navigate,
  routeState,
} from "../logic/navigation";
import { Notifier } from "./notifier";

interface ITabProps {
  name: string;
  active?: boolean;
  route: AllRouteNames;
  notify?: boolean;
}

const TabComponent = ({ name, active, route, notify }: ITabProps) => {
  const onClick = () => {
    navigate(route);
    localStorage.setItem("activeTab", route as string);
    MessageHandler.recieveMessage("clearmessages", {});
    if (notify)
      MessageHandler.recieveMessage<NotifierMessage>("clearnotifier", {
        route,
      });
  };

  const bg = active ? "bg-white rounded text-black " : "";

  return (
    <div
      onClick={onClick}
      className={`p-2 min-w-[75px] md:min-w-[100px] text-center relative cursor-pointer ${bg}`}
    >
      {name}
      {notify && <Notifier />}
    </div>
  );
};

interface IInlineTabsProps {
  parentRoute: Route;
  parentRouteName: RouteNames;
}

export const InlineTabs = ({
  parentRoute,
  parentRouteName,
}: IInlineTabsProps) => {
  const route = useSnapshot(routeState);
  const gameState = useGameState();

  if (!parentRoute.routes) return null;

  const visibleTabs = Object.keys(parentRoute.routes).filter(
    (key) => gameState.routes[key as AllRouteNames].acquired
  );
  return (
    visibleTabs.length > 1 && (
      <>
        <div className="flex flex-row -mt-2 p-1 md:p-2 -ml-2 -mr-2 md:-ml-4 md:-mr-4 md:-mt-4 mb-2 bg-slate-400 shadow text-white justify-around md:justify-normal  ">
          {visibleTabs.map((key, i) => {
            const tab = parentRoute.routes?.[key as AllSubroutes];
            const active =
              key === route.route ||
              (parentRouteName === route.route && i === 0);
            return (
              <TabComponent
                key={key}
                name={tab!.friendlyName}
                active={active}
                route={key as AllRouteNames}
                notify={gameState.routes[key as AllRouteNames].notify}
              />
            );
          })}
        </div>
      </>
    )
  );
};
