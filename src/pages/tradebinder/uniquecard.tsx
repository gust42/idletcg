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
  id: number;
  cost: Cost;
  increase: number;
}

export default function UniqueCard({
  click,
  id,
  trade,
  increase,
  cost,
}: IUniqueCardProps) {
  return (
    <>
      {trade ? (
        <div className="relative">
          <Card id={-1} />
          <div className="absolute bottom-0 bg-gray-300 p-1 h-full w-full flex  justify-between flex-col rounded-3xl">
            <p className="italic">Cost</p>
            <div>
              -{Math.floor(cost.badcards * (id + 1) ** increase)} bad cards
            </div>
            <div>
              -{Math.floor(cost.goodcards * (id + 1) ** increase)} good cards
            </div>
            <div>
              -{Math.floor(cost.metacards * (id + 1) ** increase)} meta cards
            </div>
            <Button color="#8a672d" onClick={() => click(id)}>
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
