import { PropsWithChildren } from "react";
import useGameState from "../../hooks/usegamestate";
import { calculateUniqueCardCost } from "../../logic/helpers";
import { HelpText } from "../../components/typography";
import { GameState } from "../../interfaces/logic";

const NotEnough = ({ children }: PropsWithChildren) => {
  return <div className="text-red-600">{children}</div>;
};

const CardCostElement = ({
  name,
  type,
  cost,
  state,
}: {
  name: "Bad" | "Good" | "Meta";
  type: "badcards" | "goodcards" | "metacards";
  cost: number;
  state: GameState;
}) => {
  return (
    <div>
      <div className="font-bold">{name} cards</div>
      {state.entities[type].amount < cost ? (
        <NotEnough>{cost}</NotEnough>
      ) : (
        cost
      )}
    </div>
  );
};

export const CardCost = ({ id }: { id: number }) => {
  const state = useGameState();

  const [costBadCards, costGoodCards, costMetaCards] = calculateUniqueCardCost(
    id + 1
  );

  const badCardsElement = (
    <CardCostElement
      cost={costBadCards}
      name="Bad"
      type="badcards"
      state={state}
    />
  );

  const goodCardsElement = (
    <CardCostElement
      cost={costGoodCards}
      name="Good"
      type="goodcards"
      state={state}
    />
  );

  const metaCardsElement = (
    <CardCostElement
      cost={costMetaCards}
      name="Meta"
      type="metacards"
      state={state}
    />
  );

  return (
    <>
      <HelpText>Trade cards for a unique card in this set</HelpText>
      <div className="flex flex-row gap-2 justify-between">
        <div>{badCardsElement}</div>
        <div>{goodCardsElement}</div>
        <div>{metaCardsElement}</div>
      </div>
      {/* <Button
          action=""
          disabled={notEnoughCards}
          onClick={() => tradeCard(id)}
        >
          Trade
        </Button> */}
    </>
  );
};
