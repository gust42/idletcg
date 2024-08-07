import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { SmallTitle } from "../../components/typography";
import useGameState from "../../hooks/usegamestate";
import {
  calculateRating,
  isPersonalAssistantAllowedToRun,
} from "../../logic/helpers";
import MessageHandler, { TournamentMessage } from "../../logic/messagehandler";
import { navigate } from "../../logic/navigation";
import {
  Tournament,
  TournamentLog,
  Tournaments,
} from "../../rules/tournaments/tournament";
import { TournamentJoinButton } from "./tournamentjoinbutton";

interface ILastTournamentProps {
  log: TournamentLog;
  type?: "team" | "player";
}

export const LastTournament = ({
  log,
  type = "player",
}: ILastTournamentProps) => {
  if (log) {
    return (
      <div className="flex flex-row justify-between mb-4 items-center">
        <div className="flex-grow flex row gap-2">
          <p className="font-bold ">Last run</p>
          <p className="font-semibold ">{log.points} points</p>
        </div>
        <Button
          width="100px"
          action=""
          onClick={() => {
            navigate("tournamentlog", { log, type });
          }}
        >
          Show log
        </Button>
      </div>
    );
  }

  return null;
};

const PersonalAssistant = ({ tournament }: { tournament: Tournament }) => {
  const gameState = useGameState();

  const personalAssistant = gameState.trackers.personalAssistantTournament;
  const hasPersonalAssistant = gameState.skills.personalAssistant.acquired;

  const personAssistantAllowed = isPersonalAssistantAllowedToRun(
    gameState,
    tournament.id
  );

  if (!hasPersonalAssistant) {
    return null;
  }

  return (
    <Button
      action=""
      disabled={!personAssistantAllowed}
      color={personalAssistant === tournament.id ? "green" : undefined}
      onClick={() => {
        MessageHandler.recieveMessage<TournamentMessage>(
          "personalAssistantTournament",
          {
            id: personalAssistant === tournament.id ? undefined : tournament.id,
          }
        );
      }}
    >
      Auto signup
    </Button>
  );
};

interface ITournamentProps {
  id: keyof Tournaments;
  tournament: Tournament;
  onClick: (id: keyof Tournaments) => void;
}

export const TournamentInfo = ({
  id,
  tournament,
  onClick,
}: ITournamentProps) => {
  const gameState = useGameState();

  const available =
    calculateRating(gameState.entities.rating).amount >=
    tournament.ratingRequirement;
  const ratingColor = available ? "text-green-800" : "text-red-800";

  return (
    <Container>
      <SmallTitle>{tournament.name}</SmallTitle>
      {/* <p className="italic mb-4">{tournament.description}</p> */}
      {gameState.entities.rating.acquired && (
        <p className="font-bold mb-4">
          Rating requirement{" "}
          <span className={`font-semibold ${ratingColor} `}>
            {tournament.ratingRequirement}
          </span>
        </p>
      )}

      <p className="font-bold mb-2 md:mb-4">Rewards</p>
      {available ? (
        <>
          <p className="font-semibold mb-0 md:mb-4">
            {tournament.opponents.length * 3} points -{" "}
            {tournament.returnReward(tournament.opponents.length * 3)}{" "}
            {tournament.rewardFriendlyName[0]}
          </p>
          <p className="font-semibold mb-0 md:mb-4">
            {tournament.opponents.length * 3 - 3} points -{" "}
            {tournament.returnReward(tournament.opponents.length * 3 - 3)}{" "}
            {tournament.rewardFriendlyName[1]}
          </p>

          <p className="font-semibold mb-4">
            {tournament.opponents.length * 3 - 6} points -{" "}
            {tournament.returnReward(tournament.opponents.length * 3 - 6)}{" "}
            {tournament.rewardFriendlyName[2]}
          </p>
          <p className="font-bold mb-4">Trophies: {gameState.trophys[id]}</p>
        </>
      ) : (
        <p className="font-semibold mb-4">???</p>
      )}

      <LastTournament log={gameState.logs.tournamentHistory[id]} />
      {available && (
        <div className="mb-2">
          <PersonalAssistant tournament={tournament} />
        </div>
      )}
      <TournamentJoinButton id={id} onClick={onClick} />
    </Container>
  );
};
