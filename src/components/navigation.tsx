import { useSnapshot } from "valtio";
import { routeConfig, routeState } from "../logic/navigation";

export const Navigation = () => {
  const state = useSnapshot(routeState);

  const Component = routeConfig[state.route].component;
  return <Component {...state.props} />;
};
