import { useState } from "react";
import { Button } from "../../components/button";
import { Modal } from "../../components/modal";
import { Title } from "../../components/typography";
import { Victory } from "../../components/victory";
import GameLoop from "../../logic/gameloop";
import { openPack, openPacks } from "../../logic/pack";

export const Settings = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [showExport, setShowExport] = useState(false);
  return (
    <div>
      <Title>Settings</Title>
      <div className="flex flex-col gap-4">
        <Button
          action="BACKUP"
          onClick={async () => {
            const data = localStorage.getItem("idletcg.state");
            if (data) {
              try {
                navigator.clipboard.writeText(btoa(data)).catch(() => {
                  setShowExport(true);
                });
              } catch (e) {
                setShowExport(true);
              }
            }
          }}
        >
          Save data to clipboard
        </Button>
        {showExport && (
          <div className="text-md mt-2">
            <div className="mb-2">
              <b>Save to clipboard failed, copy data manually</b>
            </div>
            <textarea
              className="w-full p-1"
              readOnly
              value={btoa(localStorage.getItem("idletcg.state") as string)}
            ></textarea>
          </div>
        )}
        <Button
          action="RESTORE"
          onClick={async () => {
            const data = prompt("Paste data here");
            const parsedData = data ? atob(data) : null;
            if (parsedData) {
              try {
                JSON.parse(parsedData as string);
              } catch (e) {
                alert("Invalid data");
                return;
              }
              GameLoop.getInstance().stop();
              setTimeout(() => {
                localStorage.setItem("idletcg.state", parsedData);
                window.location.reload();
              }, 100);
            }
          }}
        >
          Restore data from clipboard
        </Button>
        <Button
          action="RESET"
          onClick={() => {
            GameLoop.getInstance().stop();
            setTimeout(() => {
              localStorage.clear();
              window.location.reload();
            }, 100);
          }}
        >
          Clear data
        </Button>
      </div>
      <div className="text-lg mt-4">
        Check out my other games (desktop):
        <div>
          <a href="https://www.dragonhunt.net" target="_blank">
            Dragonhunt
          </a>
        </div>
        <div>
          <a href="https://landofblood.firebaseapp.com" target="_blank">
            Land of blood
          </a>
        </div>
      </div>
      {window.location.hostname === "localhost" && (
        <>
          <Button
            onClick={() => {
              const state = GameLoop.getInstance().stateHandler.getState();
              state.entities.rating.amount = 2000;
              state.entities.trophies.amount = 10000;
              state.entities.packsupply.amount = 1e20;
              state.champions.lsq.defeated = false;
            }}
            action=""
          >
            Cheat
          </Button>
          <Button
            onClick={() => {
              const metaDropRate =
                GameLoop.getInstance().rulesHandler.getRuleValue(
                  "MetaCardDroprate"
                );
              const goodDropRate =
                GameLoop.getInstance().rulesHandler.getRuleValue(
                  "GoodCardDroprate"
                );
              const goodCardMax =
                GameLoop.getInstance().rulesHandler.getRuleValue(
                  "GoodCardPackMax"
                );

              console.time("new");
              console.table(
                openPacks(100000, metaDropRate, goodDropRate, goodCardMax, 20)
              );
              console.timeEnd("new");

              console.time("old");
              let badcards = 0;
              let goodcards = 0;
              let metacards = 0;

              for (let i = 0; i < 100000; i++) {
                const pack = openPack(
                  metaDropRate,
                  goodDropRate,
                  goodCardMax,
                  20
                );

                badcards += pack.badcards;
                goodcards += pack.goodcards;
                metacards += pack.metacards;
              }
              console.timeEnd("old");

              console.table({ metacards, goodcards, badcards });
            }}
            action=""
          >
            Open pack test
          </Button>
          <Button
            action=""
            onClick={() => {
              setModalOpen(true);
            }}
          >
            Open Victory
          </Button>
          <Modal
            open={modalOpen}
            onClose={() => {
              setModalOpen(false);
            }}
          >
            <Victory onClose={() => setModalOpen(false)} />
          </Modal>
        </>
      )}
    </div>
  );
};
