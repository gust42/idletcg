import { Container } from "../../components/container";
import useGameRule from "../../hooks/usegamerule";
import { TeamMember } from "../../interfaces/logic";
import MessageHandler from "../../logic/messagehandler";
import { Slot } from "../deckbuilder/slot";

interface ITeamMemberProps {
  member: TeamMember;
}

export const TeamMemberComponent = ({ member }: ITeamMemberProps) => {
  const rule = useGameRule("DeckSize");

  const onSelect = (id: number | undefined, slot: number) => {
    MessageHandler.recieveMessage("addcardtodeck", {
      id,
      slot,
      person: member.name,
    });
  };
  return (
    <Container>
      <div className="text-xl">{member.name}</div>
      <div className="flex flex-row justify-between mt-8">
        <div>Rating: {member.rating}</div>
        <div>Tournament play speed: {member.speed * 100}%</div>
      </div>

      <div className="flex flex-row flex-wrap gap-2 mt-4">
        {Array.from({ length: rule.value }).map((_, i) => {
          const index = `slot${i + 1}` as keyof typeof member.deck;
          return (
            <Slot
              onSelect={onSelect}
              size="small"
              key={index}
              card={member.deck[index]}
              slot={i + 1}
            />
          );
        })}
      </div>
    </Container>
  );
};
