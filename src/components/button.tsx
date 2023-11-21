import { PropsWithChildren } from "react";

interface IButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  width?: string;
  color?: `#${string}`;
}

export const Button = ({
  onClick,
  width,
  color,
  children,
}: PropsWithChildren<IButtonProps>) => {
  return (
    <div
      style={{ width, backgroundColor: color }}
      className={`p-2 mr-3 text-white bg-button select-none  hover:bg-button-hover w-full rounded text-center cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
