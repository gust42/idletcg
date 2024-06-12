import { PropsWithChildren, useEffect, useRef } from "react";

interface IButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  width?: string;
  color?: `#${string}`;
  disabled?: boolean;
  action: string;
  value?: string;
  repeatable?: boolean;
}

export const Button = ({
  onClick,
  width,
  color,
  disabled,
  children,
  action = "Buy",
  repeatable = false,
}: PropsWithChildren<IButtonProps>) => {
  const mouseDownRef = useRef(0);
  const touchDownRef = useRef(0);
  const isDisabled = disabled ? "#bbb" : "";

  const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";

  const reset =
    "outline-none hover:border-slate-800 active:border-border-slate-800 active:outline-none active:bg-none focus:outline-none rounded-none";

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onMouseUp);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onMouseUp);
      onMouseUp();
    };
  }, []);

  const onPress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick(e);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchDownRef.current = setTimeout(() => {
      onMouseDown(e as unknown as React.MouseEvent<HTMLDivElement>);
    }, 200);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDownRef.current !== 0) return;

    onPress(e);
    mouseDownRef.current = setInterval(() => {
      onPress(e);
    }, 500);
  };

  const onMouseUp = () => {
    clearInterval(mouseDownRef.current);
    mouseDownRef.current = 0;
  };

  const onTouchMove = () => {
    clearTimeout(touchDownRef.current);
    onMouseUp();
  };

  const onTouchEnd = () => {
    clearTimeout(touchDownRef.current);
    onMouseUp();
  };

  if (disabled) {
    onMouseUp();
  }

  return (
    <div
      style={{ width }}
      className="p-[2px] bg-slate-600 uppercase rounded select-none hover:bg-slate-800 w-full flex flex-row items-stretch"
      {...(repeatable
        ? {
            onMouseDown,
            onMouseUp,
            onTouchStart,
            onTouchEnd,
            onTouchCancel: onMouseUp,
            onTouchMove,
          }
        : {
            onClick: onPress,
          })}
    >
      {disabled || !action ? (
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
        className={`uppercase p-1 text-white flex-grow rounded-none ${reset} border-slate-800  bg-slate-700 text-center ${cursor} flex flex-row`}
      >
        <div className="flex-grow ">{children}</div>
      </button>
    </div>
  );
};
