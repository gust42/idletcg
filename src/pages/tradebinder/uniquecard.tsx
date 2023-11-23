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
          <div className="absolute bottom-0  p-6 w-full">
            <p className="italic">Cost</p>
            <div>-{Math.floor((cost.badcards * id) ** increase)} bad cards</div>
            <div>
              -{Math.floor((cost.goodcards * id) ** increase)} good cards
            </div>
            <div>
              -{Math.floor((cost.metacards * id) ** increase)} meta cards
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
