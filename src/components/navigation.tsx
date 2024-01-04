import { useSnapshot } from "valtio";
import { findParentRoute, routeConfig, routeState } from "../logic/navigation";
import { InlineTabs } from "./inlinetabs";

export const Navigation = () => {
  const state = useSnapshot(routeState);

  const parentRoute = findParentRoute(state.route as string);

  if (parentRoute) {
    const Component = parentRoute.routes?.[state.route].component as React.FC;
    return (
      <>
        <InlineTabs parentRoute={parentRoute} />
        <Component {...state.props} />;
      </>
    );
  }

  const Component = routeConfig[state.route].component as React.FC;
  return <Component {...state.props} />;
};
