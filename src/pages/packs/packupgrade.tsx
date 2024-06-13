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
  visible: boolean;
}

export const PackUpgrade = ({
  skill,
  text,
  cost,
  acquired,
  packPoints,
  visible,
}: IPackUpgradeProps) => {
  let disabled = cost > packPoints;
  let action = "upgrade";
  let color: string | undefined = undefined;
  if (acquired) {
    disabled = false;
    action = "";
    color = "green";
  }
  return (
    visible && (
      <Button
        color={color}
        onClick={() => {
          if (!acquired)
            MessageHandler.recieveMessage<PackUpgradeData>("upgrade", {
              skill,
            });
        }}
        disabled={disabled}
        action={action}
      >
        {text}
        <div className="button-cost">{format(cost)} points</div>
      </Button>
    )
  );
};
