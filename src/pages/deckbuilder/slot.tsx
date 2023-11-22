import { useState } from "react";
import useGameRule from "../../hooks/usegamerule";
import { CostForUniqueCards } from "../../interfaces/rules";
import { rangeEmojis } from "../../logic/helpers";
import MessageHandler from "../../logic/messagehandler";
import UniqueCard from "../tradebinder/uniquecard";
import { CardPicker } from "./cardpicker";

interface ISlotProps {
  slot: number;
  card?: number;
}

export const Slot = ({ slot, card }: ISlotProps) => {
  const [cardPickerOpen, setCardPickerOpen] = useState(false);
  const gameRule = useGameRule<CostForUniqueCards>("CostForUniqueCards");

  const onSelect = (id: number) => {
    setCardPickerOpen(false);

    MessageHandler.recieveMessage("addcardtodeck", { id, slot });
  };

  const border = card === undefined ? "border-2 border-black" : "";

  return (
    <div>
      <div
        onClick={() => {
          if (card)
            MessageHandler.recieveMessage("addcardtodeck", {
              id: undefined,
              slot,
            });
          else setCardPickerOpen(!cardPickerOpen);
        }}
        className={`${border} w-[200px] h-[200px] text-center cursor-pointer`}
      >
        {card !== undefined ? (
          <UniqueCard
            click={() => {}}
            cost={gameRule}
            increase={0}
            trade={false}
            count={card}
            emoji={unescape("%u" + rangeEmojis[card])}
          />
        ) : (
          <>
            Empty slot
            <div className="text-[5em]">+</div>
          </>
        )}
      </div>
      {cardPickerOpen && <CardPicker onSelect={onSelect} />}
    </div>
  );
};
