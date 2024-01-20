import useGameState from "../../hooks/usegamestate";
import { AllTournaments } from "../../rules/ruleshandler";
import { TrophySlot } from "./trophyslot";

export default function TrophysTab() {
  const gameState = useGameState();

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {Object.values(AllTournaments).map((t, i) => {
        const index = `slot${i + 1}` as keyof typeof gameState.trophycase;
        return (
          <TrophySlot
            key={index}
            trophy={gameState.trophycase[t.id]}
            tournament={t}
          />
        );
      })}
    </div>
  );
}
