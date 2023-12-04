import { PropsWithChildren } from "react";

export const Container = ({ children }: PropsWithChildren) => {
  return (
    <div className="w-full md:w-1/4 md:min-w-fit p-1 border bg-slate-400 rounded">
      <div className="p-2 bg-slate-400  border-slate-600">{children}</div>
    </div>
  );
};
