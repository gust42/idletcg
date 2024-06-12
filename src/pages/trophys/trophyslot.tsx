import { useState } from "react";
import { Button } from "../../components/button";
import { Container } from "../../components/container";
import { Trophy } from "../../components/trophy";
import { HelpText, SmallTitle, Title } from "../../components/typography";
import useGameState from "../../hooks/usegamestate";
import { getCardSize, inBattle } from "../../logic/helpers";
import MessageHandler, {
  ChampionBattleMessage,
  TrophyMessage,
} from "../../logic/messagehandler";
import { navigate } from "../../logic/navigation";
import { AllChampions, Champion } from "../../rules/champions";
import {
  Tournament,
  TournamentLog,
  Tournaments,
} from "../../rules/tournaments/tournament";
import { TrophyPicker } from "./trophypicker";

interface ITrophySlotProps {
  tournament: Tournament;
  trophy?: boolean;
}

export const TrophySlot = ({ tournament, trophy }: ITrophySlotProps) => {
  const [trophyPickerOpen, setTrophyPickerOpen] = useState(false);
  const gameState = useGameState();

  const onPicked = (trophy: keyof Tournaments | undefined) => {
    setTrophyPickerOpen(false);

    if (trophy === undefined) return;
    MessageHandler.recieveMessage<TrophyMessage>("addtrophy", { trophy });
  };

  const border = trophy === undefined ? "border-2 border-black" : "";

  const [pxs, pic] = getCardSize("medium");

  const champion = AllChampions.find(
    (c) => c.id === tournament.champion
  ) as Champion;

  const fullDeck = Object.keys(gameState.deck.championDeck).every(
    (key) =>
      gameState.deck.championDeck[
        key as keyof typeof gameState.deck.championDeck
      ]
  );

  let reward = gameState.champions[champion.id].defeated ? (
    <div className="text-green-600">{champion.reward}</div>
  ) : (
    champion.reward
  );

  return (
    <Container>
      <Title>{tournament.name}</Title>
      <div className="flex flex-row gap-2">
        <div
          onClick={() => {
            if (!trophy) setTrophyPickerOpen(true);
          }}
        >
          <div
            className={`${border} ${pxs} aspect-[2/3] text-center  cursor-pointer`}
          >
            {trophy !== false ? (
              <Trophy trophy={tournament.id} size="medium" />
            ) : (
              <div className="border border-black flex flex-col justify-center rounded h-full gap-4">
                Empty slot
                <div className={pic}>+</div>
              </div>
            )}
          </div>
        </div>
        <div className="grow flex flex-col justify-between">
          <SmallTitle>
            {trophy ? champion?.name : "Unknown champion"}
          </SmallTitle>
          <HelpText>Reward: {trophy ? reward : "???"}</HelpText>
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
                  trophy === false ||
                  !fullDeck ||
                  gameState.trophys[tournament.id] < 10 ||
                  inBattle(gameState)
                }
              >
                10 trophys
              </Button>
            </>
          )}
        </div>
      </div>

      {trophyPickerOpen && (
        <TrophyPicker id={tournament.id} onSelect={onPicked} />
      )}
    </Container>
  );
};
