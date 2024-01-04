import { useSnapshot } from "valtio";
import {
  AllSubroutes,
  RouteNames,
  findParentRoute,
  routeConfig,
  routeState,
} from "../logic/navigation";
import { InlineTabs } from "./inlinetabs";

export const Navigation = () => {
  const state = useSnapshot(routeState);

  const Component = routeConfig[state.route as RouteNames]?.component;
  // If we don't have a component, we're probably a subroute
  if (!Component) {
    let parentRoute = findParentRoute(state.route as AllSubroutes);

    let route = state.route as AllSubroutes;
    let parentRouteName = "" as RouteNames;
    // Not a subroute, need to find first subroute for this route
    if (!parentRoute) {
      const subRoutes = Object.keys(
        routeConfig[state.route as RouteNames]?.routes || {}
      );
      route = subRoutes[0] as AllSubroutes;
      parentRoute = routeConfig[state.route as RouteNames];
      parentRouteName = state.route as RouteNames;
    }

    const Component = parentRoute?.routes?.[route as AllSubroutes]
      ?.component as React.FC;

    if (!Component) return null;
    return (
      <>
        <InlineTabs
          parentRoute={parentRoute}
          parentRouteName={parentRouteName}
        />
        <Component {...state.props} />
      </>
    );
  }

  return <Component {...state.props} />;
};
