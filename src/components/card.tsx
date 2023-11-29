import { allCards } from "../logic/helpers";
import { generateWinRatio } from "../rules/tournaments/tournament";

interface ICardsProps {
  id: number;
  size?: "small" | "medium" | "large";
}

const metaTypes = ["Aggro", "Control", "Combo"];

export const cardSize = "w-[90px] h-[135px] md:w-[150px] md:h-[225px]";

export const Card = ({ id, size = "medium" }: ICardsProps) => {
  const card = allCards.find((card) => card.id === id);

  let pxs = cardSize;
  let pic = "text-[4em]";
  let meta = "";

  if (size === "small") {
    pxs = "w-[60px] h-[90px] md:w-[100px] md:h-[150px]";
    pic = "text-[2em]";
    meta = "";
  }

  return (
    <div
      className={`${pxs} bg-[#faefdc]  rounded-3xl text-center border-black p-1 select-none`}
    >
      <div className=" bg-[#F2E8D7] h-full rounded-3xl border-black flex flex-col ">
        {!card ? (
          ""
        ) : (
          <>
            <div
              className={`${pic} flex-grow flex justify-center items-center`}
            >
              {String.fromCharCode(parseInt(card.code, 16))}
            </div>

            <div className=" border-t-2 md:border-t-4 border-black p-1  ">
              <div className={`${meta}`}>{metaTypes[id % 3]}</div>
              {generateWinRatio(id)}%{size !== "small" && <> power</>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
