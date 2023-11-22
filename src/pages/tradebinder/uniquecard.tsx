import { Button } from "../../components/button";

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

const metaTypes = ["Aggro", "Control", "Combo"];

export default function UniqueCard({
  click,
  count,
  ...props
}: IUniqueCardProps) {
  let tradeDiv = null;

  if (props.trade) {
    tradeDiv = (
      <div>
        <Button onClick={() => click(count)}>Trade</Button>
        <div className="border rounded bg-gray-100 border-gray-500 p-1">
          <p className="italic">Cost</p>
          <div>
            -{Math.floor((props.cost.badcards * count) ** props.increase)} bad
            cards
          </div>
          <div>
            -{Math.floor((props.cost.goodcards * count) ** props.increase)} good
            cards
          </div>
          <div>
            -{Math.floor((props.cost.metacards * count) ** props.increase)} meta
            cards
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="m-3 w-[200px] bg-white h-[200px] relative">
      <div className="border-4 rounded text-center border-black pt-2">
        <div className="absolute left-1 top-1 border-r-4 border-b-4 border-black p-1">
          {count}
        </div>
        <div className="absolute right-1 top-1 border-l-4 border-b-4 border-black p-1">
          {metaTypes[count % 3]}
        </div>
        <div className="text-[6em]">{props.trade ? "?" : props.emoji}</div>

        <div className=" border-t-4 border-black p-1">
          {Math.abs(Math.floor(Math.sin(count) * Math.sin(count) * 100 - 50))}%
          winrate
        </div>
      </div>
      {tradeDiv}
    </div>
  );
}
