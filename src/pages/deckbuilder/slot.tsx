import { useState } from "react";
import { Card, cardSize } from "../../components/card";
import MessageHandler from "../../logic/messagehandler";
import { CardPicker } from "./cardpicker";

interface ISlotProps {
  slot: number;
  card?: number;
}

export const Slot = ({ slot, card }: ISlotProps) => {
  const [cardPickerOpen, setCardPickerOpen] = useState(false);

  const onSelect = (id: number | undefined) => {
    setCardPickerOpen(false);

    MessageHandler.recieveMessage("addcardtodeck", { id, slot });
  };

  const border = card === undefined ? "border-2 border-black" : "";

  return (
    <div
      onClick={() => {
        if (card !== undefined)
          MessageHandler.recieveMessage("addcardtodeck", {
            id: undefined,
            slot,
          });
        else setCardPickerOpen(!cardPickerOpen);
      }}
    >
      <div
        className={`${border} ${cardSize} text-center rounded-3xl cursor-pointer`}
      >
        {card !== undefined ? (
          <Card id={card} />
        ) : (
          <div className="flex flex-col justify-center h-full gap-4 -mt-4">
            Empty slot
            <div className="text-[5em]">+</div>
          </div>
        )}
      </div>
      {cardPickerOpen && <CardPicker onSelect={onSelect} />}
    </div>
  );
};
