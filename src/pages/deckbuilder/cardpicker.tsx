import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import { CostForUniqueCards } from "../../interfaces/rules";
import { rangeEmojis } from "../../logic/helpers";
import UniqueCard from "../tradebinder/uniquecard";

interface ICardPickerProps {
  onSelect: (id: number) => void;
}

export const CardPicker = ({ onSelect }: ICardPickerProps) => {
  const gameState = useGameState();
  const gameRule = useGameRule<CostForUniqueCards>("CostForUniqueCards");

  const myCards = rangeEmojis.slice(
    0,
    gameState.counters.uniquecards.amount + 1
  );

  return (
    <>
      <div className="absolute p-16 z-10 bg-white top-[100px] left-[100px] right-[100px] w-auto overflow-y-auto rounded shadow-md ">
        <h2 className="text-xl mb-6">Choose a card for this slot</h2>
        <div className="flex flex-row flex-wrap gap-2">
          {myCards.map((code, index) => (
            <div
              key={code}
              onClick={() => onSelect(index)}
              className="cursor-pointer"
            >
              <UniqueCard
                trade={false}
                key={"emj" + index}
                click={() => {}}
                cost={gameRule}
                increase={gameRule.increase}
                count={index + 1}
                emoji={unescape("%u" + code)}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute top-0 left-0 w-screen h-screen bg-black opacity-50 z-0" />
    </>
  );
};
