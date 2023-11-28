import { useState } from "react";
import { Card } from "../../components/card";
import MessageHandler from "../../logic/messagehandler";
import { CardPicker } from "./cardpicker";

interface ISlotProps {
  slot: number;
  card?: number;
}

export const Slot = ({ slot, card }: ISlotProps) => {
  const [cardPickerOpen, setCardPickerOpen] = useState(false);

  const onSelect = (id: number) => {
    setCardPickerOpen(false);

    MessageHandler.recieveMessage("addcardtodeck", { id, slot });
  };

  const border = card === undefined ? "border-2 border-black" : "";

  return (
    <div>
      <div
        onClick={() => {
          if (card !== undefined)
            MessageHandler.recieveMessage("addcardtodeck", {
              id: undefined,
              slot,
            });
          else setCardPickerOpen(!cardPickerOpen);
        }}
        className={`${border} w-[90px] h-[135px] md:w-[200px] md:h-[300px] text-center rounded-3xl cursor-pointer`}
      >
        {card !== undefined ? (
          <Card id={card} />
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
