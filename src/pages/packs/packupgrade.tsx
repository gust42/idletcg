import { Button } from "../../components/button";
import { format } from "../../helpers/number";
import { GameState } from "../../interfaces/logic";
import MessageHandler from "../../logic/messagehandler";
import { PackUpgradeData } from "../../logic/packmanager";

interface IPackUpgradeProps {
  skill: keyof GameState["pack"];
  text: string;
  cost: number;
  acquired: boolean;
  packPoints: number;
  disabled?: boolean;
}

export const PackUpgrade = ({
  skill,
  text,
  cost,
  acquired,
  packPoints,
}: IPackUpgradeProps) => {
  return (
    acquired && (
      <Button
        onClick={() => {
          MessageHandler.recieveMessage<PackUpgradeData>("upgrade", { skill });
        }}
        disabled={cost > packPoints}
        action="upgrade"
      >
        {text}
        <div className="button-cost">{format(cost)} points</div>
      </Button>
    )
  );
};
