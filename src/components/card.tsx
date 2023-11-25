import { allCards } from "../logic/helpers";

interface ICardsProps {
  id: number;
}

const metaTypes = ["Aggro", "Control", "Combo"];

export const Card = ({ id }: ICardsProps) => {
  const card = allCards.find((card) => card.id === id);

  return (
    <div className="w-[100px] h-[150px] md:w-[200px] md:h-[300px]  bg-[#F2E8D7] border-2 md:border-4 rounded-3xl text-center border-black p-1 select-none">
      <div className="border-2 md:border-4 h-full rounded-3xl border-black flex flex-col ">
        {!card ? (
          <div className="text-[3em] flex-grow flex justify-center items-center">
            ?
          </div>
        ) : (
          <>
            <div className="text-[4em] flex-grow flex justify-center items-center">
              {String.fromCharCode(parseInt(card.code, 16))}
            </div>

            <div className=" border-t-2 md:border-t-4 border-black p-1  ">
              <div className=" border-2 md:border-4 rounded-full border-black p-1">
                {metaTypes[id % 3]}
              </div>
              {Math.abs(Math.floor(Math.sin(id) * Math.sin(id) * 100 - 50))}%
              winrate
            </div>
          </>
        )}
      </div>
    </div>
  );
};
