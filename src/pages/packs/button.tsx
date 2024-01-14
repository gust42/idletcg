import React from "react";
import { Button } from "../../components/button";
import useGameState from "../../hooks/usegamestate";
import BulkButton from "./bulkbutton";

interface IButtonProps {
  resource: {
    amount: number;
    acquired: boolean;
  };
  type: string;
  click: (amount: number) => void;
  cost: number;
  text: string;
  disabled?: boolean;
}

export default function BuyButton({ disabled, ...props }: IButtonProps) {
  const gameState = useGameState();
  const isDisabled = props.resource.amount === 0 || disabled ? true : false;
  function clickEvent(_e: React.MouseEvent<HTMLDivElement>, amount: number) {
    if (disabled) return;

    if (props.click) props.click(amount);
  }

  if (!props.resource.acquired) return null;

  let x10 = null;
  let x100 = null;
  let x1000 = null;
  let xAll = null;
  // let x10000 = null;

  if (props.type === "sell") {
    if (props.resource.amount >= 10)
      x10 = <BulkButton amount={10} click={(e) => clickEvent(e, 10)} />;

    if (props.resource.amount >= 100)
      x100 = <BulkButton amount={100} click={(e) => clickEvent(e, 100)} />;

    if (props.resource.amount >= 1000)
      x1000 = <BulkButton amount={1000} click={(e) => clickEvent(e, 1000)} />;

    xAll = (
      <BulkButton action="" amount={-1} click={(e) => clickEvent(e, -1)} />
    );
    // if (props.resource.amount >= 10000)
    //   x10000 = (
    //     <BulkButton amount={10000} click={(e) => clickEvent(e, 10000)} />
    //   );
  } else if (props.type === "buy") {
    if (props.resource.amount / props.cost >= 10)
      x10 = (
        <BulkButton action="buy" amount={10} click={(e) => clickEvent(e, 10)} />
      );

    if (props.resource.amount / props.cost >= 100)
      x100 = (
        <BulkButton
          action="buy"
          amount={100}
          click={(e) => clickEvent(e, 100)}
        />
      );

    if (props.resource.amount / props.cost >= 1000)
      x1000 = (
        <BulkButton
          action="buy"
          amount={1000}
          click={(e) => clickEvent(e, 1000)}
        />
      );

    xAll = (
      <BulkButton action="" amount={-1} click={(e) => clickEvent(e, -1)} />
    );
  }

  return (
    <div className=" w-full md:w-[320px] flex flex-col">
      <div className="flex flex-row">
        <Button
          width={gameState.pack.xAll.amount === 1 ? "95%" : "100%"}
          action={props.type}
          disabled={isDisabled}
          onClick={(e) => clickEvent(e, 1)}
        >
          {props.text}
          <div className="button-cost"> {props.cost} money</div>
        </Button>

        {gameState.pack.xAll.amount === 1 && xAll}
      </div>
      <div className="flex flex-row gap-2 mt-1">
        {gameState.pack.x10.amount === 1 && x10}
        {gameState.pack.x100.amount === 1 && x100}

        {gameState.pack.x1000.amount === 1 && x1000}
      </div>
    </div>
  );
}
