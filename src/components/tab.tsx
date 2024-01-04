import { useSnapshot } from "valtio";
import MessageHandler from "../logic/messagehandler";
import { findParentRoute, navigate, routeState } from "../logic/navigation";
import { TabConfig } from "../rules/tabs";

interface ITabProps {
  item: {
    acquired: boolean;
  };
  tab: TabConfig;
}

export default function Tab({ item, tab }: ITabProps) {
  const route = useSnapshot(routeState);
  const onClick = () => {
    navigate(tab.route);
    localStorage.setItem("activeTab", tab.route as string);
    MessageHandler.recieveMessage("clearmessages", {});
  };

  if (!item?.acquired) return null;

  let active = tab.route === route.route;

  const parentRoute = findParentRoute(route.route as string);
  if (parentRoute?.routes && !active) {
    console.log(parentRoute.routes, route.route);

    active =
      Object.keys(parentRoute.routes).includes(route.route as string) &&
      parentRoute.friendlyName === tab.friendlyName;
  }

  const activeStyle = active ? "bg-white text-black" : "";

  return (
    <div
      className={
        "p-2 rounded-t cursor-pointer text-white " + (activeStyle || "")
      }
      onClick={onClick}
    >
      {tab.friendlyName}
    </div>
  );
}
