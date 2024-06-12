import { useEffect, useRef } from "react";
import { Thinking } from "../../components/Thinking";
import { Button } from "../../components/button";
import { SmallTitle } from "../../components/typography";
import useGameState from "../../hooks/usegamestate";
import { navigate } from "../../logic/navigation";
import { AllChampions, Champions } from "../../rules/champions";
import { TournamentLog } from "../../rules/tournaments/tournament";
import { TournamentPlay } from "./tournamentplay";

export const ActiveChampionBattle = () => {
  const gameState = useGameState();

  const currentChampion = useRef<Champions | undefined>(undefined);

  if (!currentChampion.current) {
    currentChampion.current = gameState.activities.champion?.id;
  }

  const championBattleState = gameState.activities.champion;

  useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  }, [championBattleState?.gameRound]);

  let champion = AllChampions.find((c) => c.id === championBattleState?.id);

  if (!champion) {
    champion = AllChampions.find((c) => c.id === currentChampion.current);
  }

  if (!champion) {
    return <div>No champion battle found</div>;
  }

  const log = gameState.champions[champion.id].lastTournament as TournamentLog;

  const deckSize = Object.keys(champion.deck).length;

  const gameRound = championBattleState?.gameRound ?? deckSize;

  return (
    <div>
      <SmallTitle>
        You fight a battle against the great champion {champion.name}
      </SmallTitle>
      <div className="flex flex-col gap-2 w-full md:w-[400px]">
        <div className="flex flex-row justify-between"></div>
        <TournamentPlay
          nameOfOpponent={champion.name}
          gameRound={gameRound}
          opponent={0}
          log={log}
        />
        {gameRound < deckSize && <Thinking />}
      </div>

      {gameRound >= deckSize && log.points === 3 && (
        <div className="pt-4 text-2xl text-green-600">
          You have defeated {champion.name}
        </div>
      )}
      {gameRound >= deckSize && log.points < 3 && (
        <>
          <div className="pt-4 text-xl text-red-600">
            You have been defeated by {champion.name}
          </div>
          <Button
            action=""
            onClick={() => {
              navigate("trophys");
            }}
          >
            Return
          </Button>
        </>
      )}
    </div>
  );
};
