import { useEffect, useState } from "react";
import "./App.css";
import MessageBox from "./components/messagebox";
import { Navigation } from "./components/navigation";
import { OfflineModal, Paused } from "./components/paused";
import ResourceView from "./components/resourceview";
import Tab from "./components/tab";
import useGameState from "./hooks/usegamestate";
import GameLoop, { offlineHandler } from "./logic/gameloop";
import { Tabs, tabs } from "./rules/tabs";

function App() {
  const [offlineModalOpen, setOfflineModalOpen] = useState(false);
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
    (key) => gameState.tabs[key as Tabs].acquired
  );

  return (
    <div className="flex flex-col h-full text-xs md:text-base items-stretch">
      <nav className="flex flex-row gap-3 items-stretch flex-shrink-0 overflow-x-auto pt-3">
        {visibleTabs.map((tab) => {
          return (
            <Tab
              key={tab}
              item={gameState.tabs[tab as keyof typeof gameState.tabs]}
              tab={tabs[tab as Tabs]}
            />
          );
        })}
      </nav>
      <div className="flex flex-row items-stretch flex-grow">
        <aside className="p-2 bg-slate-300 border-r-2 min-w-[120px] md:min-w-[180px]">
          <ResourceView />
        </aside>
        <article className="bg-gradient-to-b from-slate-200 to-slate-300 p-2 md:p-4 flex-grow overflow-auto">
          <Navigation />
        </article>
      </div>
      <footer className="fixed md:block bottom-0 right left-0 right-0">
        <MessageBox />
      </footer>
      <Paused />
      {offlineModalOpen && (
        <OfflineModal
          onClose={() => setOfflineModalOpen(false)}
          open={offlineModalOpen}
        />
      )}
    </div>
  );
}

export default App;
