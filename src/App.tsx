import { useEffect, useState } from "react";
import "./App.css";

import MessageBox from "./components/messagebox";
import ResourceView from "./components/resourceview";
import Tab from "./components/tab";
import useGameState from "./hooks/usegamestate";
import GameLoop from "./logic/gameloop";
import MessageHandler from "./logic/messagehandler";
import PacksTab from "./pages/packs/packstab";
import { Tabs, tabs } from "./rules/tabs";

function App() {
  const [CurrentTab, setCurrentTab] = useState(<PacksTab />);
  const [activeTab, setActiveTab] = useState("packstab");
  const gameState = useGameState();

  useEffect(() => {
    const gameLoop = GameLoop.getInstance();
    gameLoop.start();

    return () => {
      gameLoop.stop();
    };
  }, []);

  function clickTab(id: string, type: JSX.Element) {
    setActiveTab(id);
    setCurrentTab(type);
    MessageHandler.recieveMessage("clearmessages", {});
  }

  const visibleTabs = Object.keys(tabs).filter(
    (key) => gameState.tabs[key as Tabs].acquired
  );

  return (
    <div className="flex flex-col h-full text-xs md:text-base items-stretch">
      <nav className="flex flex-row gap-3 items-stretch flex-shrink-0 overflow-x-auto pt-3">
        {visibleTabs.map((tab) => {
          const Component = tabs[tab as Tabs].component;
          return (
            <Tab
              key={tab}
              name={tabs[tab as Tabs].friendlyName}
              active={activeTab === tab}
              onClick={() => clickTab(tab, <Component />)}
              item={gameState.tabs[tab as keyof typeof gameState.tabs]}
            />
          );
        })}
      </nav>
      <div className="flex flex-row items-stretch flex-grow">
        <aside className="p-2 bg-slate-300 border-r-2 min-w-[120px] md:min-w-[180px]">
          <ResourceView />
        </aside>
        <article className="bg-gradient-to-b from-slate-200 to-slate-300 p-2 md:p-4 flex-grow overflow-auto">
          {CurrentTab}
        </article>
      </div>
      <footer className="fixed md:block bottom-0 right left-0 right-0">
        <MessageBox />
      </footer>
    </div>
  );
}

export default App;
