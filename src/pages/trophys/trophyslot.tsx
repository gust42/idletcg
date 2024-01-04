import { useState } from "react";
import { Trophy } from "../../components/trophy";
import { TrophyPicker } from "./trophypicker";
import { getCardSize } from "../../logic/helpers";
import { Tournaments } from "../../rules/tournaments/tournament";

interface ITrophySlotProps {
  slot: number;
  trophy?: keyof Tournaments;
  size?: "small" | "medium";
  onSelect: (trophy: string | undefined, slot: number) => void;
}

export const TrophySlot = ({
  slot,
  trophy,
  onSelect,
  size = "medium",
}: ITrophySlotProps) => {
  const [trophyPickerOpen, setTrophyPickerOpen] = useState(false);

  const onPicked = (trophy: string | undefined) => {
    setTrophyPickerOpen(false);
    onSelect(trophy, slot);
  };

  const border = trophy === undefined ? "border-2 border-black" : "";

  const [pxs, pic] = getCardSize(size);

  return (
    <>
      <div
        onClick={() => {
          if (trophy !== undefined) onSelect(undefined, slot);
          else setTrophyPickerOpen(true);
        }}
      >
        <div className={`${border} ${pxs} text-center  cursor-pointer`}>
          {trophy !== undefined ? (
            <Trophy trophy={trophy} size={size} />
          ) : (
            <div className="flex flex-col justify-center rounded h-full gap-4 -mt-4">
              {size !== "small" && <>Empty slot</>}
              <div className={pic}>+</div>
            </div>
          )}
        </div>
      </div>

      {trophyPickerOpen && <TrophyPicker onSelect={onPicked} />}
    </>
  );
};
