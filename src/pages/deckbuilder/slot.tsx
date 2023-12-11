import { useState } from "react";
import { Card } from "../../components/card";
import { CardPicker } from "./cardpicker";
import { getCardSize } from "../../logic/helpers";

interface ISlotProps {
  slot: number;
  card?: number;
  size?: "small" | "medium";
  onSelect: (id: number | undefined, slot: number) => void;
}

export const Slot = ({ slot, card, onSelect, size = "medium" }: ISlotProps) => {
  const [cardPickerOpen, setCardPickerOpen] = useState(false);

  const onPicked = (id: number | undefined) => {
    setCardPickerOpen(false);

    onSelect(id, slot);
  };

  const border = card === undefined ? "border-2 border-black" : "";

  const [pxs, pic] = getCardSize(size);

  return (
    <div
      onClick={() => {
        if (card !== undefined) onSelect(undefined, slot);
        else setCardPickerOpen(!cardPickerOpen);
      }}
    >
      <div
        className={`${border} ${pxs} text-center rounded-3xl cursor-pointer`}
      >
        {card !== undefined ? (
          <Card size={size} id={card} />
        ) : (
          <div className="flex flex-col justify-center h-full gap-4 -mt-4">
            Empty slot
            <div className={pic}>+</div>
          </div>
        )}
      </div>
      {cardPickerOpen && <CardPicker onSelect={onPicked} />}
    </div>
  );
};
