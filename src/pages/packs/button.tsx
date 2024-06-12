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

export default function BuyButton({ disabled, type, ...props }: IButtonProps) {
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

  const amount =
    type === "sell"
      ? props.resource.amount
      : props.resource.amount / props.cost;

  x10 = (
    <BulkButton
      disabled={amount < 10}
      amount={10}
      click={(e) => clickEvent(e, 10)}
    />
  );
  x100 = (
    <BulkButton
      disabled={amount < 100}
      amount={100}
      click={(e) => clickEvent(e, 100)}
    />
  );
  x1000 = (
    <BulkButton
      disabled={amount < 1000}
      amount={1000}
      click={(e) => clickEvent(e, 1000)}
    />
  );
  xAll = <BulkButton amount={-1} click={(e) => clickEvent(e, -1)} />;

  return (
    <div className=" w-full md:w-[320px] flex flex-col">
      <div className="flex flex-row">
        <Button
          width={gameState.pack.xAll.amount === 1 ? "95%" : "100%"}
          action={type}
          disabled={isDisabled}
          onClick={(e) => clickEvent(e, 1)}
          repeatable
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
