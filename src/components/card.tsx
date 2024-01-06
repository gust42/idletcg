import useGameState from "../hooks/usegamestate";
import { allCards, getCardSize } from "../logic/helpers";
import { generateWinRatio, metaTypes } from "../rules/tournaments/tournament";

interface ICardsProps {
  id: number;
  size?: "small" | "medium" | "large";
  winRateMod?: number;
}

export const Card = ({ id, size = "medium", winRateMod = 1 }: ICardsProps) => {
  const state = useGameState();
  const card = allCards.find((card) => card.id === id);

  const [pxs, pic] = getCardSize(size);
  const meta = "";

  const winRateColor =
    winRateMod > 1 ? "text-green-600" : winRateMod < 1 ? "text-red-600" : "";

  return (
    <div
      className={`${pxs} bg-[#faefdc]  rounded-3xl text-center  p-1 select-none`}
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
              <div className={`${meta}`}>{metaTypes[id % 3]}</div>
              <span className={winRateColor}>
                {Math.floor(generateWinRatio(id, state) * winRateMod)}%
                {size !== "small" && <> power</>}
              </span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
