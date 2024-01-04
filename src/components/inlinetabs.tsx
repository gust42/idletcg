import { useSnapshot } from "valtio";
import { Route, navigate, routeState } from "../logic/navigation";
import MessageHandler from "../logic/messagehandler";

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

  const bg = active ? "bg-white underline " : "bg-[#282c34] text-white ";
  return (
    <div onClick={onClick} className={`p-2 w-full mb-4 underline ${bg}`}>
      {name}
    </div>
  );
};

interface IInlineTabsProps {
  parentRoute: Route;
}

export const InlineTabs = ({ parentRoute }: IInlineTabsProps) => {
  const route = useSnapshot(routeState);

  if (!parentRoute.routes) return null;
  return (
    <>
      <div className="flex flex-row  -mt-2 -ml-2 -mr-2  ">
        {Object.keys(parentRoute.routes).map((key) => {
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
  );
};
