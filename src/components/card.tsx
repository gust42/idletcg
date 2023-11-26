import { allCards } from "../logic/helpers";

interface ICardsProps {
  id: number;
  size?: "small" | "medium" | "large";
}

const metaTypes = ["Aggro", "Control", "Combo"];

export const Card = ({ id, size = "medium" }: ICardsProps) => {
  const card = allCards.find((card) => card.id === id);

  let pxs = "w-[100px] h-[150px] md:w-[200px] md:h-[300px]";
  let pic = "text-[4em]";
  let meta = "border-2 md:border-4 rounded-full border-black p-1";

  if (size === "small") {
    pxs = "w-[50px] h-[75px] md:w-[100px] md:h-[150px]";
    pic = "text-[2em]";
    meta = "border-1 md:border-2 rounded-full border-black p-0.5";
  }

  return (
    <div
      className={`${pxs} bg-[#F2E8D7] border-2 md:border-4 rounded-3xl text-center border-black p-1 select-none`}
    >
      <div className="border-2 md:border-4 h-full rounded-3xl border-black flex flex-col ">
        {!card ? (
          <div className="text-[3em] flex-grow flex justify-center items-center">
            ?
          </div>
        ) : (
          <>
            <div
              className={`${pic} flex-grow flex justify-center items-center`}
            >
              {String.fromCharCode(parseInt(card.code, 16))}
            </div>

            <div className=" border-t-2 md:border-t-4 border-black p-1  ">
              <div className={`${meta}`}>{metaTypes[id % 3]}</div>
              {Math.abs(Math.floor(Math.sin(id) * Math.sin(id) * 100 - 50))}%
              {size !== "small" && <>winrate</>}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
