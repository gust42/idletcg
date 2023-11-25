import { PropsWithChildren } from "react";

interface IButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
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

  return (
    <div
      style={{ width, backgroundColor: isDisabled || color }}
      className={`p-2 text-white uppercase select-none  hover:bg-button-hover  bg-button w-full text-center ${cursor} flex flex-row`}
      onClick={onClick}
    >
      <div className="flex-grow ">{children}</div>
    </div>
  );
};
