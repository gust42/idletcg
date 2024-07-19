import { MouseEvent, useEffect, useState } from "react";
import useGameState from "../hooks/usegamestate";
import { BattleCard } from "../logic/battleCard";
import { allCards, getCardSize } from "../logic/helpers";
import { metaTypes } from "../rules/tournaments/tournament";
import { CardTooltip } from "./cardtooltip";

interface ICardsProps {
  id: number;
  size?: "small" | "medium" | "large";
  addBuffs?: boolean;
  winRateMod?: number;
  showOrignal?: boolean;
}

export const Card = ({
  id,
  size = "medium",
  winRateMod = 1,
  addBuffs = true,
  showOrignal = false,
}: ICardsProps) => {
  const state = useGameState();
  const [showTooltip, setShowTooltip] = useState(false);
  const card = allCards.find((card) => card.id === id);
  const battleCard = new BattleCard(id, state);

  useEffect(() => {
    if (addBuffs)
      window.addEventListener("click", () => {
        setShowTooltip(false);
      });
    return () => {
      if (addBuffs)
        window.removeEventListener("click", () => {
          setShowTooltip(false);
        });
    };
  }, [addBuffs]);

  const [pxs, pic] = getCardSize(size);
  const meta = "";

  const winRateColor =
    winRateMod > 1 ? "text-green-600" : winRateMod < 1 ? "text-red-600" : "";

  let wr = Math.floor(battleCard.wr * winRateMod);

  if (addBuffs) {
    wr = Math.floor(battleCard.totalWR * winRateMod);
  }

  const buffed = addBuffs && battleCard.activeEffects.length > 0;

  return (
    <>
      <div
        className={`relative ${pxs} aspect-[2/3] bg-[#faefdc] grow  rounded-3xl text-center  p-1 select-none`}
      >
        <div className=" bg-[#F2E8D7] h-full rounded-3xl  flex flex-col ">
          {!card ? (
            ""
          ) : (
            <>
              <div
                className={`${pic} flex-grow flex justify-center items-center`}
              >
                {String.fromCharCode(parseInt(card.code, 16))}
              </div>

              <div className=" border-t-2 md:border-t-4 border-[#faefdc] p-1">
                <span
                  className={`${winRateColor} ${buffed ? "underline" : ""}`}
                  onClick={(ev: MouseEvent<HTMLSpanElement>) => {
                    if (buffed) {
                      setShowTooltip(!showTooltip);
                      ev.stopPropagation();
                    }
                  }}
                >
                  <span className="text-md">{wr}</span>
                  <span className="text-xs">
                    %{size !== "small" && <> WR</>}
                  </span>
                  {buffed && (
                    <span dangerouslySetInnerHTML={{ __html: "&uArr;" }} />
                  )}
                </span>
                {showOrignal && battleCard.wr !== wr && <> ({battleCard.wr})</>}
                <div className={`${meta}`}>{metaTypes[id % 3]}</div>
              </div>
            </>
          )}
        </div>
        {showTooltip && (
          <CardTooltip card={battleCard} cardModifier={winRateMod} />
        )}
      </div>
    </>
  );
};
