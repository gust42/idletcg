import MessageHandler from "../../logic/messagehandler";
import { AllTournaments } from "../../rules/ruleshandler";
import { Tournaments } from "../../rules/tournaments/tournament";
import { TournamentInfo } from "./tournament";

export const TournamentTab = () => {
  function enterTournament(id: keyof Tournaments) {
    MessageHandler.recieveMessage("entertournament", { id });
  }

  const tournaments = Object.keys(AllTournaments).map((key) => {
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
    <div className="p-1">
      <h1>Tournaments</h1>
      {tournaments}
    </div>
  );
};
