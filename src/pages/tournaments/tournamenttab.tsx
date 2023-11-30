import useGameState from "../../hooks/usegamestate";
import MessageHandler from "../../logic/messagehandler";
import { AllTournaments } from "../../rules/ruleshandler";
import { Tournaments } from "../../rules/tournaments/tournament";
import { ActiveTournament } from "./activetournament";
import { TournamentInfo } from "./tournament";

export const TournamentTab = () => {
  const gameState = useGameState();
  function enterTournament(id: keyof Tournaments) {
    MessageHandler.recieveMessage("entertournament", { id });
  }

  const tournaments = Object.keys(AllTournaments)
    .filter(
      (t) =>
        gameState.entities.rating.amount + 400 >=
        AllTournaments[t as keyof Tournaments].ratingRequirement
    )
    .map((key) => {
      return (
        <TournamentInfo
          key={key}
          id={key as keyof Tournaments}
          tournament={AllTournaments[key as keyof Tournaments]}
          onClick={enterTournament}
        />
      );
    });

  if (gameState.activities.tournament?.id !== undefined) {
    return <ActiveTournament />;
  } else {
    return (
      <div>
        <h1 className="mb-4">Tournaments</h1>
        <div className="flex flex-row flex-wrap gap-4">{tournaments}</div>
      </div>
    );
  }
};
