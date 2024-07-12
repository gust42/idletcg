import { HelpText } from "../../components/typography";
import useGameState from "../../hooks/usegamestate";
import { inBattle } from "../../logic/helpers";
import MessageHandler from "../../logic/messagehandler";
import { navigate } from "../../logic/navigation";
import { AllTournaments } from "../../rules/ruleshandler";
import { Tournaments } from "../../rules/tournaments/tournament";
import { TournamentInfo } from "./tournament";

export const TournamentTab = () => {
  const gameState = useGameState();
  function enterTournament(id: keyof Tournaments) {
    if (!inBattle(gameState))
      MessageHandler.recieveMessage("entertournament", { id });
    navigate("activetournament");
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
    <div>
      <HelpText>
        Build your deck to play in tournaments. Your opponents always plays
        cards in the same order so you have to figure out which order to play
        your cards to win.
      </HelpText>
      <div className="flex flex-row flex-wrap gap-4">{tournaments}</div>
    </div>
  );
};
