import { useState } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import useGameState from "../../hooks/usegamestate";
import { AllTournaments } from "../../rules/ruleshandler";
import { Tournaments } from "../../rules/tournaments/tournament";
import MessageHandler, {
  AssignTournamentMessage,
} from "../../logic/messagehandler";

interface ITournamentJoinButton {
  id: keyof Tournaments;
  onClick: (id: keyof Tournaments, showLog: boolean) => void;
}

export const TournamentJoinButton = ({
  id,
  onClick,
}: ITournamentJoinButton) => {
  const gameState = useGameState();
  const tournament = AllTournaments[id];
  const [open, setOpen] = useState(false);

  const disabled =
    gameState.entities.rating.amount < tournament.ratingRequirement;

  if (gameState.team.length > 0) {
    const teamMember = gameState.team.find(
      (member) => member.currentTournament === id
    );

    return (
      <div className="flex flex-row">
        <Button
          disabled={disabled}
          width="70%"
          action="SIGNUP"
          onClick={() => onClick(id, false)}
        >
          Enter ({tournament.entryFee})
        </Button>
        <Button
          width="30%"
          action=""
          onClick={() => {
            setOpen(true);
          }}
        >
          {teamMember ? teamMember.name : <span className="text-xxl">+</span>}
        </Button>

        <Modal
          onClose={() => {
            setOpen(false);
          }}
          open={open}
        >
          <div className="flex flex-col gap-4">
            <h2 className="text-lg mb-4">
              Select teammember to enter tournament
            </h2>
            <div className="flex flex-col gap-2">
              {gameState.team
                .filter((m) => m.rating >= tournament.ratingRequirement)
                .map((member) => (
                  <Button
                    key={member.name}
                    action=""
                    onClick={() => {
                      MessageHandler.recieveMessage<AssignTournamentMessage>(
                        "assigntournament",
                        {
                          person: member.name,
                          id,
                        }
                      );
                      setOpen(false);
                    }}
                  >
                    {member.name}
                  </Button>
                ))}
              <Button
                action=""
                onClick={() => {
                  MessageHandler.recieveMessage<AssignTournamentMessage>(
                    "assigntournament",
                    {
                      person: "",
                      id,
                    }
                  );
                  setOpen(false);
                }}
              >
                None
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }

  return (
    <Button
      disabled={disabled}
      action="SIGNUP"
      onClick={() => onClick(id, false)}
    >
      Enter ({tournament.entryFee})
    </Button>
  );
};
