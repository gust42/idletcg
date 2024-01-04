import { useSnapshot } from "valtio";
import MessageHandler, { NotifierMessage } from "../logic/messagehandler";
import {
  AllSubroutes,
  findParentRoute,
  navigate,
  routeState,
} from "../logic/navigation";
import { TabConfig } from "../rules/tabs";
import useGameState from "../hooks/usegamestate";
import { Notifier } from "./notifier";

interface ITabProps {
  item: {
    acquired: boolean;
  };
  tab: TabConfig;
}

export default function Tab({ item, tab }: ITabProps) {
  const route = useSnapshot(routeState);
  const state = useGameState();
  const onClick = () => {
    navigate(tab.route);
    localStorage.setItem("activeTab", tab.route as string);
    MessageHandler.recieveMessage("clearmessages", {});

    if (state.routes[tab.route].notify)
      MessageHandler.recieveMessage<NotifierMessage>("clearnotifier", {
        route: tab.route,
      });
  };

  if (!item?.acquired) return null;

  let active = tab.route === route.route;

  const parentRoute = findParentRoute(route.route as AllSubroutes);
  if (parentRoute?.routes && !active) {
    active =
      Object.keys(parentRoute.routes).includes(route.route as string) &&
      parentRoute.friendlyName === tab.friendlyName;
  }

  const activeStyle = active ? "bg-white text-black" : "";

  let notify = null;
  if (state.routes[tab.route].notify) {
    notify = <Notifier />;
  }

  return (
    <div
      className={`p-2 rounded cursor-pointer grow text-white relative ${activeStyle}`}
      onClick={onClick}
    >
      {tab.friendlyName}
      {notify}
    </div>
  );
}
