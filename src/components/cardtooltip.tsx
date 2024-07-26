import { BattleCard } from "../logic/battleCard";
import { DataContainer } from "./container";

export interface CardTooltipProps {
  card: BattleCard;
  cardModifier: number;
}

function translateType(type: string, value: number) {
  if (type === "additive") return `+${value}`;
  if (type === "multiplicative") return `+${Math.floor((value - 1) * 100)}%`;
  return type;
}

export const CardTooltip = ({ card }: CardTooltipProps) => {
  return (
    <div className="absolute bg-slate-300 left-0 top-0 w-[200px] p-2 text-left border-slate-500 border rounded-md flex flex-col gap-2 z-10">
      <div className="flex flex-row gap-4">
        <DataContainer title="Buffed value">
          {Math.floor(card.totalWR)} WR
        </DataContainer>
        <DataContainer title="Original value">{card.wr} WR</DataContainer>
      </div>

      <DataContainer title="Effects on card">
        {card.activeEffects.map((effect, i) => (
          <div key={i}>{translateType(effect.type, effect.effect)} WR</div>
        ))}
      </DataContainer>
    </div>
  );
};
