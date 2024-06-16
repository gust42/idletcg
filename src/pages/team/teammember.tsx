import { useState } from "react";
import { Button } from "../../components/button";
import { ActionContainer, Container } from "../../components/container";
import { Modal } from "../../components/modal";
import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import { TeamMember } from "../../interfaces/logic";
import MessageHandler, {
  AssignTournamentMessage,
} from "../../logic/messagehandler";
import { AllTournaments } from "../../rules/ruleshandler";
import { Tournaments } from "../../rules/tournaments/tournament";
import { Slot } from "../deckbuilder/slot";
import { LastTournament } from "../tournaments/tournament";
import { formatSeconds } from "./../../logic/helpers";

interface ITeamMemberProps {
  member: TeamMember;
}

export const TeamMemberComponent = ({ member }: ITeamMemberProps) => {
  const rule = useGameRule("DeckSize");
  const state = useGameState();
  const [open, setOpen] = useState(false);

  const stateMember = state.team.find((m) => m.name === member.name)!;

  const currentTournament = stateMember.currentTournament
    ? AllTournaments[stateMember.currentTournament]
    : undefined;

  const onSelect = (id: number | undefined, slot: number) => {
    MessageHandler.recieveMessage("addcardtodeck", {
      id,
      slot,
      person: member.name,
    });
  };

  const numberOfCards = Object.keys(stateMember.deck);
  const fullDeck =
    Object.values(stateMember.deck).every((card) => card !== undefined) &&
    numberOfCards.length >= rule.value;

  return (
    <Container>
      <div className="text-xl">{member.name}</div>
      <div className="flex flex-row justify-between mt-8">
        <div>Rating: {Math.floor(stateMember.rating)}</div>
        <div>Tournament round time: {formatSeconds(member.speed)}</div>
      </div>
      <div className="flex flex-row justify-between mt-8">
        <b>Trophies: {stateMember.trophies ?? 0}</b>
      </div>
      <div className="text-lg mt-8">Deck</div>
      <div className="flex flex-row flex-wrap gap-2 mt-4 mb-4">
        {Array.from({ length: rule.value }).map((_, i) => {
          const index = `slot${i + 1}` as keyof typeof stateMember.deck;
          return (
            <Slot
              onSelect={onSelect}
              size="small"
              key={index}
              card={stateMember.deck[index]}
              slot={i + 1}
            />
          );
        })}
      </div>
      {stateMember.lastTournament && (
        <LastTournament log={stateMember.lastTournament} />
      )}
      <ActionContainer>
        <Button
          action="PLAYING"
          disabled={!fullDeck}
          onClick={() => {
            setOpen(true);
          }}
        >
          {currentTournament ? (
            currentTournament.name
          ) : (
            <span className="text-xxl">+</span>
          )}
        </Button>
      </ActionContainer>
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
            {Object.keys(AllTournaments)
              .filter(
                (t) =>
                  AllTournaments[t as keyof Tournaments].ratingRequirement <=
                  stateMember.rating
              )
              .map((t) => {
                const tournament = AllTournaments[t as keyof Tournaments];
                return (
                  <Button
                    key={tournament.name}
                    action=""
                    onClick={() => {
                      MessageHandler.recieveMessage<AssignTournamentMessage>(
                        "assigntournament",
                        {
                          person: member.name,
                          id: tournament.id,
                        }
                      );
                      setOpen(false);
                    }}
                  >
                    {tournament.name}
                  </Button>
                );
              })}
            <Button
              action=""
              onClick={() => {
                MessageHandler.recieveMessage<AssignTournamentMessage>(
                  "assigntournament",
                  {
                    person: member.name,
                    id: undefined,
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
    </Container>
  );
};
