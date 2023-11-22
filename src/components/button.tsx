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
      className={`p-2 mr-3 text-white bg-button select-none  hover:bg-button-hover w-full rounded text-center ${cursor}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
