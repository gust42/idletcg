import { allCards } from "../logic/helpers";

interface ICardsProps {
  id: number;
}

const metaTypes = ["Aggro", "Control", "Combo"];

export const Card = ({ id }: ICardsProps) => {
  const card = allCards.find((card) => card.id === id);

  return (
    <div className="w-[200px] bg-[#F2E8D7] h-[300px] border-4 rounded-3xl text-center border-black p-1 select-none">
      <div className="border-4 h-full rounded-3xl border-black relative ">
        {!card ? (
          <div className="text-[6em]">?</div>
        ) : (
          <>
            <div className="absolute left-1 top-1 border-4 w-16 rounded-full border-black p-1">
              {id + 1}
            </div>
            <div className="absolute right-1 top-1 border-4 rounded-full border-black p-1">
              {metaTypes[id % 3]}
            </div>
            <div className="text-[6em] mt-10">
              {String.fromCharCode(parseInt(card.code, 16))}
            </div>

            <div className=" border-t-4 border-black p-1 ">
              {Math.abs(Math.floor(Math.sin(id) * Math.sin(id) * 100 - 50))}%
              winrate
            </div>
          </>
        )}
      </div>
    </div>
  );
};
