import { PropsWithChildren } from "react";
import useGameState from "../../hooks/usegamestate";
import { calculateUniqueCardCost } from "../../logic/helpers";
import { Card } from "../../components/card";
import MessageHandler from "../../logic/messagehandler";
import { Button } from "../../components/button";

const NotEnough = ({ children }: PropsWithChildren) => {
  return <div className="text-red-500">{children}</div>;
};

export const TradeCard = ({ id }: { id: number }) => {
  const state = useGameState();

  function tradeCard(id: number) {
    MessageHandler.recieveMessage("tradecard", { id });
  }

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
    <div className="relative">
      <Card id={-1} />
      <div className="absolute bottom-0 top-0 right-0 left-0 bg-[#00000020] p-1 pt-2 pb-4  flex text-center justify-between flex-col rounded-3xl">
        <p className="italic">Card cost</p>
        <div>{badCardsElement}</div>
        <div>{goodCardsElement}</div>
        <div>{metaCardsElement}</div>
        <Button
          action=""
          disabled={notEnoughCards}
          onClick={() => tradeCard(id)}
        >
          Trade
        </Button>
      </div>
    </div>
  );
};
