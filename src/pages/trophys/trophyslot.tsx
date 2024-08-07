import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { HelpText, SmallTitle, Title } from "../../components/typography";
import useGameRule from "../../hooks/usegamerule";
import useGameState from "../../hooks/usegamestate";
import { canFightNextChampion, inBattle } from "../../logic/helpers";
import MessageHandler, {
  ChampionBattleMessage,
} from "../../logic/messagehandler";
import { navigate } from "../../logic/navigation";
import { AllChampions, Champion } from "../../rules/champions";
import { Tournament, TournamentLog } from "../../rules/tournaments/tournament";

interface ITrophySlotProps {
  tournament: Tournament;
}

export const ChampionCard = ({ tournament }: ITrophySlotProps) => {
  const gameState = useGameState();

  const battleCost = useGameRule("ChampionBattleCost");

  const champion = AllChampions.find(
    (c) => c.id === tournament.champion
  ) as Champion;

  const fullDeck = Object.values(gameState.deck.championDeck).every(
    (value) => value !== undefined
  );

  const reward = gameState.champions[champion.id].defeated ? (
    <div className="text-green-600">{champion.reward}</div>
  ) : (
    champion.reward
  );

  const unlocked = gameState.trophys[tournament.id] >= 10;

  let disabledReason = "";

  if (!canFightNextChampion(champion.id, gameState))
    disabledReason = "Defeat previous champion first";
  else if (!unlocked) disabledReason = "Not enough trophies won";
  else if (!fullDeck) disabledReason = "Deck not complete";
  else if (inBattle(gameState)) disabledReason = "Already in battle";

  return (
    <Container>
      <Title>{tournament.name}</Title>
      <div className="flex flex-row gap-2">
        <div className="grow flex flex-col justify-between">
          <SmallTitle>{unlocked ? champion.name : `Name: ???`}</SmallTitle>
          {!unlocked && (
            <HelpText>
              Missing {10 - gameState.trophys[tournament.id]} trophies in this
              tournament
            </HelpText>
          )}
          <HelpText>Reward: {unlocked ? reward : "???"}</HelpText>
          {gameState.champions[champion.id].defeated ? (
            <Title>Defeated</Title>
          ) : (
            <>
              {gameState.champions[champion.id].lastTournament && (
                <>
                  <Button
                    action=""
                    onClick={() => {
                      navigate("championlog", {
                        log: gameState.champions[champion.id]
                          .lastTournament as TournamentLog,
                      });
                    }}
                  >
                    Show last battle
                  </Button>
                  <div className="mb-1" />
                </>
              )}
              <Button
                onClick={() => {
                  MessageHandler.recieveMessage<ChampionBattleMessage>(
                    "championbattle",
                    { id: tournament.champion }
                  );
                  navigate("activechampionbattle");
                }}
                action="BATTLE"
                disabled={
                  !!disabledReason ||
                  gameState.entities.trophies.amount < battleCost.value
                }
              >
                {disabledReason || `${battleCost.value} trophys`}
              </Button>
            </>
          )}
        </div>
      </div>
    </Container>
  );
};
