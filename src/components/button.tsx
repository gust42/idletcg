import { PropsWithChildren } from "react";

interface IButtonProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  width?: string;
  color?: `#${string}`;
  disabled?: boolean;
}

export const Button = ({
  onClick,
  width,
  color,
  disabled,
  children,
}: PropsWithChildren<IButtonProps>) => {
  const isDisabled = disabled ? "#bbb" : "";

  const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";

  const reset = "outline-none active:outline-none focus:outline-none";

  const onPress = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    onClick(e);
  };

  return (
    <div style={{ width }} className="p-1 bg-slate-500 rounded w-full ">
      <button
        style={{ backgroundColor: isDisabled || color }}
        className={`p-1 text-white uppercase w-full rounded-none ${reset} hover:bg-button-hover border-slate-800  bg-slate-700 text-center ${cursor} flex flex-row`}
        onClick={onPress}
      >
        <div className="flex-grow ">{children}</div>
      </button>
    </div>
  );
};
