import {
  PropsWithChildren,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

interface IButtonProps {
  onClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  width?: string;
  color?: `#${string}` | string;
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
  const [isDown, setIsDown] = useState(false);
  const mouseDownRef = useRef(0);
  const touchDownRef = useRef(0);
  const isDisabled = disabled ? "#bbb" : "";

  const cursor = disabled ? "cursor-not-allowed" : "cursor-pointer";

  const reset =
    "outline-none hover:border-slate-800 active:border-border-slate-800 active:outline-none active:bg-none focus:outline-none rounded-none";

  const onMouseUp = useCallback(() => {
    clearInterval(mouseDownRef.current);
    mouseDownRef.current = 0;
    if (!disabled) setIsDown(false);
  }, [disabled]);

  useEffect(() => {
    window.addEventListener("mouseup", onMouseUp);
    window.addEventListener("touchend", onMouseUp);

    return () => {
      window.removeEventListener("mouseup", onMouseUp);
      window.removeEventListener("touchend", onMouseUp);
      onMouseUp();
    };
  }, [onMouseUp]);

  const onPress = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    onClick(e);
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    touchDownRef.current = setTimeout(() => {
      onMouseDown(e as unknown as React.MouseEvent<HTMLDivElement>);
    }, 300);
  };

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (mouseDownRef.current !== 0) return;

    setIsDown(true);

    onPress(e);
    mouseDownRef.current = setInterval(() => {
      onPress(e);
    }, 300);
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

  const backgroundColor = isDown ? "bg-slate-900" : "bg-slate-700";

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
        className={`uppercase p-1 text-white flex-grow rounded-none ${reset} border-slate-800  ${backgroundColor} text-center ${cursor} flex flex-row`}
      >
        <div className="flex-grow ">{children}</div>
      </button>
    </div>
  );
};
