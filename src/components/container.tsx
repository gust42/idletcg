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
