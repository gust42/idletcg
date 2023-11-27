import { PropsWithChildren } from "react";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import useGameState from "../../hooks/usegamestate";

type Cost = {
  badcards: number;
  goodcards: number;
  metacards: number;
};

interface IUniqueCardProps {
  trade: boolean;
  click: (count: number) => void;
  id: number;
  cost: Cost;
  increase: number;
}

const NotEnough = ({ children }: PropsWithChildren) => {
  return <div className="text-red-500">{children}</div>;
};

export default function UniqueCard({
  click,
  id,
  trade,
  increase,
  cost,
}: IUniqueCardProps) {
  const state = useGameState();

  const costBadCards = Math.floor(cost.badcards * (id + 1) ** increase);
  const costGoodCards = Math.floor(cost.goodcards * (id + 1) ** increase);
  const costMetaCards = Math.floor(cost.metacards * (id + 1) ** increase);

  let notEnoughCards = false;

  let badCardsElement = <>-{costBadCards} bad cards</>;
  if (
    state.entities.badcards.amount <
    Math.floor(cost.badcards * (id + 1) ** increase)
  ) {
    badCardsElement = <NotEnough>{badCardsElement}</NotEnough>;
    notEnoughCards = true;
  }

  let goodCardsElement = <>-{costGoodCards} good cards</>;
  if (
    state.entities.goodcards.amount <
    Math.floor(cost.goodcards * (id + 1) ** increase)
  ) {
    goodCardsElement = <NotEnough>{goodCardsElement}</NotEnough>;
    notEnoughCards = true;
  }

  let metaCardsElement = <>-{costMetaCards} meta cards</>;

  if (
    state.entities.metacards.amount <
    Math.floor(cost.metacards * (id + 1) ** increase)
  ) {
    metaCardsElement = <NotEnough>{metaCardsElement}</NotEnough>;
    notEnoughCards = true;
  }
  return (
    <>
      {trade ? (
        <div className="relative">
          <Card id={-1} />
          <div className="absolute bottom-0 bg-gray-300 p-1 pt-4 pb-4 h-full w-full flex  justify-between flex-col rounded-3xl">
            <p className="italic">Cost</p>
            <div>{badCardsElement}</div>
            <div>{goodCardsElement}</div>
            <div>{metaCardsElement}</div>
            <Button
              disabled={notEnoughCards}
              color="#8a672d"
              onClick={() => click(id)}
            >
              Obtain
            </Button>
          </div>
        </div>
      ) : (
        <Card id={id} />
      )}
    </>
  );
}
