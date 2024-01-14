import { useState } from "react";
import { Card } from "../../components/card";
import { getCardSize } from "../../logic/helpers";
import { CardPicker } from "./cardpicker";

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
      className="grow md:grow-0"
      onClick={() => {
        if (card !== undefined) onSelect(undefined, slot);
        else setCardPickerOpen(!cardPickerOpen);
      }}
    >
      {card !== undefined ? (
        <Card size={size} id={card} />
      ) : (
        <div
          className={`${border} ${pxs} aspect-[2/3] text-center rounded-3xl cursor-pointer grow`}
        >
          <div className="flex flex-col justify-center h-full gap-4 -mt-4">
            {size !== "small" && <>Empty slot</>}
            <div className={pic}>+</div>
          </div>
        </div>
      )}
      {cardPickerOpen && <CardPicker onSelect={onPicked} />}
    </div>
  );
};
