import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full md:max-w-fit border-slate-100 border-2 rounded shadow">
      <div className="p-2 bg-gradient-to-b to-slate-200 from-slate-300  border-slate-600">
        {children}
      </div>
    </div>
  );
};

export const DataContainer = ({
  children,
  title,
  col = true,
}: PropsWithChildren<{ title: string; col?: boolean }>) => {
  return (
    <div
      className={`flex ${col ? "flex-col" : "flex-row"} justify-between gap-2`}
    >
      <div className="font-bold shrink-0">{title}</div>
      <div className="">{children}</div>
    </div>
  );
};

export const ActionContainer = ({ children }: PropsWithChildren) => {
  return <div className="-ml-2 -mb-2 -mr-2">{children}</div>;
};
