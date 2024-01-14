import { PropsWithChildren } from "react";
export const Title = ({ children }: PropsWithChildren) => (
  <div className="text-xl font-semibold mb-3">{children}</div>
);

export const SmallTitle = ({ children }: PropsWithChildren) => (
  <div className="text-lg font-semibold mb-2">{children}</div>
);

export const HelpText = ({ children }: PropsWithChildren) => (
  <div className="text-md text-gray-700 mb-2">{children}</div>
);
