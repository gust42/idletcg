import { PropsWithChildren } from "react";

interface IButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  width?: string;
}

export const Button = ({
  onClick,
  width = "100%",
  children,
}: PropsWithChildren<IButtonProps>) => {
  return (
    <div
      className={`p-2 mr-3 text-white bg-button select-none  hover:bg-button-hover w-[${width}] rounded text-center cursor-pointer`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};
