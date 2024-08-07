import useGameState from "../../hooks/usegamestate";
import { AllTournaments } from "../../rules/ruleshandler";
import { ChampionCard } from "./trophyslot";

export default function TrophysTab() {
  const gameState = useGameState();

  const hasCompleteChampionDeck = Object.values(
    gameState.deck.championDeck
  ).every((c) => c !== undefined);

  const visibleChampions = Object.values(AllTournaments)
    .map((t, i) => {
      const index = `slot${i + 1}` as keyof typeof gameState.trophycase;
      return <ChampionCard key={index} tournament={t} />;
    })
    .filter((c) => c !== undefined);

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {!hasCompleteChampionDeck && (
        <div className="p-2 w-full font-bold bg-red-200">
          You need to complete your Champion Deck to fight champions, see deck
          builder
        </div>
      )}
      {visibleChampions}
    </div>
  );
}
