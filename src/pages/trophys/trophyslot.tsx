import { useState } from "react";
import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { Trophy } from "../../components/trophy";
import { SmallTitle, Title } from "../../components/typography";
import { getCardSize } from "../../logic/helpers";
import MessageHandler, { TrophyMessage } from "../../logic/messagehandler";
import { Tournament, Tournaments } from "../../rules/tournaments/tournament";
import { TrophyPicker } from "./trophypicker";

interface ITrophySlotProps {
  tournament: Tournament;
  trophy?: boolean;
}

export const TrophySlot = ({ tournament, trophy }: ITrophySlotProps) => {
  const [trophyPickerOpen, setTrophyPickerOpen] = useState(false);

  const onPicked = (trophy: keyof Tournaments | undefined) => {
    setTrophyPickerOpen(false);

    if (trophy === undefined) return;
    MessageHandler.recieveMessage<TrophyMessage>("addtrophy", { trophy });
  };

  const border = trophy === undefined ? "border-2 border-black" : "";

  const [pxs, pic] = getCardSize("medium");

  return (
    <Container>
      <Title>{tournament.name}</Title>
      <div className="flex flex-row gap-2">
        <div
          className="w-1/3"
          onClick={() => {
            if (!trophy) setTrophyPickerOpen(true);
          }}
        >
          <div
            className={`${border} ${pxs} aspect-[2/3] text-center  cursor-pointer`}
          >
            {trophy !== false ? (
              <Trophy trophy={tournament.id} size={"medium"} />
            ) : (
              <div className="border border-black flex flex-col justify-center rounded h-full gap-4">
                Empty slot
                <div className={pic}>+</div>
              </div>
            )}
          </div>
        </div>
        <div className="grow flex flex-col justify-between">
          <SmallTitle>Champion</SmallTitle>
          <div className="font-semibold">{trophy ? "LSQ" : "???"}</div>
          <Button onClick={() => {}} action="" disabled={trophy === false}>
            Battle
          </Button>
        </div>
      </div>

      {trophyPickerOpen && (
        <TrophyPicker id={tournament.id} onSelect={onPicked} />
      )}
    </Container>
  );
};
