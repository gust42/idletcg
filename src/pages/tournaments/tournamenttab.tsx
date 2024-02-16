import useGameState from "../../hooks/usegamestate";
import MessageHandler from "../../logic/messagehandler";
import { navigate } from "../../logic/navigation";
import { AllTournaments } from "../../rules/ruleshandler";
import { Tournaments } from "../../rules/tournaments/tournament";
import { TournamentInfo } from "./tournament";

export const TournamentTab = () => {
  const gameState = useGameState();
  function enterTournament(id: keyof Tournaments) {
    MessageHandler.recieveMessage("entertournament", { id });
    navigate("activetournament");
  }

  const tournaments = Object.keys(AllTournaments)
    .filter(
      (t) =>
        gameState.entities.rating.amount + 100 >=
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

  return (
    <div>
      <div className="flex flex-row flex-wrap gap-4">{tournaments}</div>
    </div>
  );
};
