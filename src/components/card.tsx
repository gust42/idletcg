import useGameState from "../hooks/usegamestate";
import { allCards, getCardSize } from "../logic/helpers";
import { generateWinRatio, metaTypes } from "../rules/tournaments/tournament";

interface ICardsProps {
  id: number;
  size?: "small" | "medium" | "large";
  myCard?: boolean;
  winRateMod?: number;
  showOrignal?: boolean;
}

export const Card = ({
  id,
  size = "medium",
  winRateMod = 1,
  myCard = true,
  showOrignal = false,
}: ICardsProps) => {
  const state = useGameState();
  const card = allCards.find((card) => card.id === id);

  const [pxs, pic] = getCardSize(size);
  const meta = "";

  const winRateColor =
    winRateMod > 1 ? "text-green-600" : winRateMod < 1 ? "text-red-600" : "";

  const buffedWinratio = Math.floor(
    generateWinRatio(id, myCard ? state : undefined) * winRateMod
  );

  const originalWinRatio = generateWinRatio(id, undefined, -1, true);

  return (
    <div
      className={`${pxs} aspect-[2/3] bg-[#faefdc] grow  rounded-3xl text-center  p-1 select-none`}
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

            <div className=" border-t-2 md:border-t-4 border-[#faefdc] p-1  ">
              <span className={winRateColor}>
                <span className="text-md">{buffedWinratio}</span>
                <span className="text-xs">%{size !== "small" && <> WR</>}</span>
              </span>
              {showOrignal && originalWinRatio !== buffedWinratio && (
                <> ({originalWinRatio})</>
              )}
              <div className={`${meta}`}>{metaTypes[id % 3]}</div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
