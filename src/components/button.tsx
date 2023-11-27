import { PropsWithChildren } from "react";

interface IButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
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

  const reset = "outline-none active:outline-none focus:outline-none";

  const onPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick(e);
  };

  return (
    <div
      style={{ width }}
      className="p-1 bg-slate-500 uppercase rounded w-full flex flex-row items-stretch  "
    >
      <div
        className={`p-1 text-white ${
          disabled ? "bg-[#bbb]" : "bg-slate-800"
        } flex items-center`}
      >
        {disabled ? "-" : action}
      </div>
      <button
        style={{ backgroundColor: isDisabled || color }}
        className={`p-1 text-white  flex-grow rounded-none ${reset} hover:bg-button-hover border-slate-800  bg-slate-700 text-center ${cursor} flex flex-row`}
        onClick={onPress}
      >
        <div className="flex-grow ">{children}</div>
      </button>
    </div>
  );
};
