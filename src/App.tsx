import { useEffect, useState } from "react";
import "./App.css";
import { Modal } from "./components/modal";
import { Navigation } from "./components/navigation";
import { OfflineModal, Paused } from "./components/paused";
import ResourceView from "./components/resourceview";
import Tab from "./components/tab";
import { Victory } from "./components/victory";
import useGameState from "./hooks/usegamestate";
import GameLoop, { offlineHandler } from "./logic/gameloop";
import { navigate } from "./logic/navigation";
import { Tabs, tabs } from "./rules/tabs";

function App() {
  const [offlineModalOpen, setOfflineModalOpen] = useState(false);
  const [victoryModalOpen, setVictoryModalOpen] = useState(false);
  const gameState = useGameState();

  useEffect(() => {
    const gameLoop = GameLoop.getInstance();

    const ticks = offlineHandler.checkOffline();

    if (ticks > 10) {
      setOfflineModalOpen(true);
    } else gameLoop.start();

    return () => {
      gameLoop.stop();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const visibleTabs = Object.keys(tabs).filter(
    (key) => gameState.routes[key as Tabs].acquired
  );

  if (
    gameState.stats.allChampionsDefeated &&
    !victoryModalOpen &&
    !gameState.stats.continuePlaying
  ) {
    setVictoryModalOpen(true);
  }

  return (
    <div className="flex flex-col h-[100dvh] text-xs md:text-base items-stretch">
      <nav className="flex flex-row gap-3 flex-shrink-0 overflow-x-auto p-1 md:p-4 md:h-16 fixed z-10 w-screen h-10">
        {visibleTabs.length > 1 &&
          visibleTabs.map((tab) => {
            return (
              <Tab
                key={tab}
                item={gameState.routes[tab as keyof typeof gameState.routes]}
                tab={tabs[tab as Tabs]}
              />
            );
          })}
      </nav>
      <div className="flex flex-row items-stretch flex-grow pt-10 md:pt-16">
        <aside className="p-1 bg-slate-300 border-r-2 w-[120px] md:min-w-[180px] fixed z-10 min-h-[calc(100dvh-40px)] md:min-h-[calc(100dvh-64px)] flex justify-between flex-col">
          <ResourceView />
          <div className="text-xs">
            If you like this game,{" "}
            <a href="https://buymeacoffee.com/gust42" target="_blank">
              buy me a coffee
            </a>
            {gameState.routes.skillstab.acquired && (
              <div
                className="mt-4 underline cursor-pointer"
                onClick={() => {
                  navigate("settings");
                }}
              >
                Settings
              </div>
            )}
          </div>
        </aside>
        <article className="bg-gradient-to-b from-slate-200 to-slate-300 pl-[126px] md:pl-[196px] p-2 md:p-4 flex-grow overflow-auto">
          <Navigation />
        </article>
      </div>
      {/* <footer className="fixed md:block bottom-0 right left-0 right-0">
        <MessageBox />
      </footer> */}
      <Paused />
      {offlineModalOpen && (
        <OfflineModal
          onClose={() => setOfflineModalOpen(false)}
          open={offlineModalOpen}
        />
      )}
      <Modal open={victoryModalOpen} onClose={() => {}}>
        <Victory onClose={() => setVictoryModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;
