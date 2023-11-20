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

export default function UniqueCard(props: IUniqueCardProps) {
  let tradeDiv = null;

  if (props.trade) {
    tradeDiv = (
      <div className="button" onClick={() => props.click(props.count)}>
        <div>Trades for</div>
        <div className="requirement">
          <div>
            {Math.floor((props.cost.badcards * props.count) ** props.increase)}{" "}
            bad cards
          </div>
          <div>
            {Math.floor((props.cost.goodcards * props.count) ** props.increase)}{" "}
            good cards
          </div>
          <div>
            {Math.floor((props.cost.metacards * props.count) ** props.increase)}{" "}
            meta cards
          </div>
        </div>
        Trade
      </div>
    );
  }

  return (
    <div className="unique-card-container">
      <div className="unique-card">
        <div className="number">{props.count}</div>
        <div className="emoji">{props.trade ? "?" : props.emoji}</div>
      </div>
      {tradeDiv}
    </div>
  );
}
