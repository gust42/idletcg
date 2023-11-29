import { PropsWithChildren } from "react";

interface IButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  width?: string;
  color?: `#${string}`;
  disabled?: boolean;
  action: string;
  value?: string;
}

export const Button = ({
  onClick,
  width,
  color,
  disabled,
  children,
  action = "Buy",
}: PropsWithChildren<IButtonProps>) => {
  const isDisabled = disabled ? "#bbb" : "";

  const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";

  const reset =
    "outline-none hover:border-slate-800 active:border-border-slate-800 active:outline-none active:bg-none focus:outline-none rounded-none";

  const onPress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick(e);
  };

  return (
    <div
      style={{ width }}
      className="p-1 bg-slate-600 uppercase rounded select-none  hover:bg-slate-800 w-full flex flex-row items-stretch  "
      onClick={onPress}
    >
      {disabled ? (
        ""
      ) : (
        <button
          className={`uppercase ${reset} p-1 text-white bg-slate-800 flex items-center`}
        >
          {action}
        </button>
      )}
      <button
        style={{ backgroundColor: isDisabled || color }}
        className={`uppercase p-1 text-white  flex-grow rounded-none ${reset} border-slate-800  bg-slate-700 text-center ${cursor} flex flex-row`}
      >
        <div className="flex-grow ">{children}</div>
      </button>
    </div>
  );
};
