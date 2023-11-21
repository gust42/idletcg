import { PropsWithChildren } from "react";

interface IButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
}

export const Button = ({
  onClick,
  children,
}: PropsWithChildren<IButtonProps>) => {
  return (
    <div
      className="p-2 mr-3 text-white bg-button  hover:bg-button-hover w-[100%] rounded text-center cursor-pointer"
      onClick={onClick}
    >
      {children}
    </div>
  );
};
