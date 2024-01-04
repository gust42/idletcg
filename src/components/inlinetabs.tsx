import { useSnapshot } from "valtio";
import { Route, navigate, routeState } from "../logic/navigation";
import MessageHandler from "../logic/messagehandler";
import useGameState from "../hooks/usegamestate";

interface ITabProps {
  name: string;
  active?: boolean;
  route: string;
}

const TabComponent = ({ name, active, route }: ITabProps) => {
  const onClick = () => {
    navigate(route);
    localStorage.setItem("activeTab", route as string);
    MessageHandler.recieveMessage("clearmessages", {});
  };

  const bg = active ? "bg-white rounded text-black " : "";
  return (
    <div onClick={onClick} className={`p-2 min-w-[100px] text-center  ${bg}`}>
      {name}
    </div>
  );
};

interface IInlineTabsProps {
  parentRoute: Route;
}

export const InlineTabs = ({ parentRoute }: IInlineTabsProps) => {
  const route = useSnapshot(routeState);
  const gameState = useGameState();

  if (!parentRoute.routes) return null;

  const visibleTabs = Object.keys(parentRoute.routes).filter(
    (key) => gameState.routes[key as keyof typeof gameState.routes].acquired
  );
  return (
    visibleTabs.length > 1 && (
      <>
        <div className="flex flex-row -mt-2 p-1 -ml-2 -mr-2 mb-2 bg-slate-400 shadow text-white  ">
          {visibleTabs.map((key) => {
            const tab = parentRoute.routes?.[key];
            return (
              <TabComponent
                key={key}
                name={tab!.friendlyName}
                active={key === route.route}
                route={key}
              />
            );
          })}
        </div>
      </>
    )
  );
};
