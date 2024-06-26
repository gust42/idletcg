import useGameState from "../../hooks/usegamestate";
import { AllTournaments } from "../../rules/ruleshandler";
import { TrophySlot } from "./trophyslot";

export default function TrophysTab() {
  const gameState = useGameState();

  const hasCompleteChampionDeck = Object.values(
    gameState.deck.championDeck
  ).every((c) => c !== undefined);

  let visibleChampions = Object.values(AllTournaments)
    .map((t, i) => {
      const index = `slot${i + 1}` as keyof typeof gameState.trophycase;
      if (gameState.trophys[t.id] >= 10) {
        return <TrophySlot key={index} tournament={t} />;
      }
    })
    .filter((c) => c !== undefined);

  let hasVisibleChampions = true;

  if (visibleChampions.length === 0) {
    hasVisibleChampions = false;

    visibleChampions = [
      <div key="empty" className="p-2 w-full">
        You need to win more trophies in a tournament to unlock its champion
      </div>,
    ];
  }

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {!hasCompleteChampionDeck && hasVisibleChampions && (
        <div className="p-2 w-full font-bold bg-red-200">
          You need to complete your Champion Deck to fight champions, see deck
          builder
        </div>
      )}
      {visibleChampions}
    </div>
  );
}
