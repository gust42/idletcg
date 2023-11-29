import { PropsWithChildren } from "react";
import { Button } from "../../components/button";
import { Card } from "../../components/card";
import useGameState from "../../hooks/usegamestate";
import { calculateUniqueCardCost } from "../../logic/helpers";

interface IUniqueCardProps {
  trade: boolean;
  click: (count: number) => void;
  id: number;
}

const NotEnough = ({ children }: PropsWithChildren) => {
  return <div className="text-red-500">{children}</div>;
};

export default function UniqueCard({ click, id, trade }: IUniqueCardProps) {
  const state = useGameState();

  const [costBadCards, costGoodCards, costMetaCards] =
    calculateUniqueCardCost(id);

  let notEnoughCards = false;

  let badCardsElement = <>{costBadCards} bad</>;
  if (state.entities.badcards.amount < costBadCards) {
    badCardsElement = <NotEnough>{badCardsElement}</NotEnough>;
    notEnoughCards = true;
  }

  let goodCardsElement = <>{costGoodCards} good</>;
  if (state.entities.goodcards.amount < costGoodCards) {
    goodCardsElement = <NotEnough>{goodCardsElement}</NotEnough>;
    notEnoughCards = true;
  }

  let metaCardsElement = <>{costMetaCards} meta</>;

  if (state.entities.metacards.amount < costMetaCards) {
    metaCardsElement = <NotEnough>{metaCardsElement}</NotEnough>;
    notEnoughCards = true;
  }
  return (
    <>
      {trade ? (
        <div className="relative">
          <Card id={-1} />
          <div className="absolute bottom-0 top-0 right-0 left-0 bg-[#00000020] p-1 pt-2 pb-4  flex text-center justify-between flex-col rounded-3xl">
            <p className="italic">Card cost</p>
            <div>{badCardsElement}</div>
            <div>{goodCardsElement}</div>
            <div>{metaCardsElement}</div>
            <Button
              action="Trade"
              disabled={notEnoughCards}
              onClick={() => click(id)}
            >
              {notEnoughCards ? "Trade" : "Card"}
            </Button>
          </div>
        </div>
      ) : (
        <Card id={id} />
      )}
    </>
  );
}
