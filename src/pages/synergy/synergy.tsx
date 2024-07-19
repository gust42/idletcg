import { Synergy } from "../../interfaces/logic";
import MessageHandler, { AddSynergyMessage } from "../../logic/messagehandler";
import { Postion } from "../../logic/synergy/synergy";
import { Slot } from "../deckbuilder/slot";

interface SynergyProps {
  synergy: Synergy;
  type: Postion;
}

export const SynergyComponent = ({ synergy, type }: SynergyProps) => {
  const onSlotClick = (cardId: number | undefined) => {
    MessageHandler.recieveMessage<AddSynergyMessage>("addsynergy", {
      id: synergy.id,
      cardId,
      position: type,
    });
  };
  return (
    <div>
      <div className="capitalize mb-2">{type}</div>
      <Slot
        size="small"
        onSelect={(id) => {
          onSlotClick(id);
        }}
        slot={1}
        card={synergy[type]}
      />
    </div>
  );
};
