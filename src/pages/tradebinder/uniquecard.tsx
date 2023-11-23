import { Button } from "../../components/button";
import { Card } from "../../components/card";

type Cost = {
  badcards: number;
  goodcards: number;
  metacards: number;
};

interface IUniqueCardProps {
  trade: boolean;
  click: (count: number) => void;
  count: number;
  cost: Cost;
  increase: number;
  emoji: string;
}

export default function UniqueCard({
  click,
  count,
  trade,
  ...props
}: IUniqueCardProps) {
  return (
    <>
      {trade ? (
        <div className="relative">
          <Card id={-1} />
          <div className="absolute bottom-0  p-6 w-full">
            <p className="italic">Cost</p>
            <div>
              -{Math.floor((props.cost.badcards * count) ** props.increase)} bad
              cards
            </div>
            <div>
              -{Math.floor((props.cost.goodcards * count) ** props.increase)}{" "}
              good cards
            </div>
            <div>
              -{Math.floor((props.cost.metacards * count) ** props.increase)}{" "}
              meta cards
            </div>
            <Button color="#8a672d" onClick={() => click(count)}>
              Obtain
            </Button>
          </div>
        </div>
      ) : (
        <Card id={count} />
      )}
    </>
  );
}
