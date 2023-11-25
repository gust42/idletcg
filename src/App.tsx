import { useEffect, useState } from "react";
import "./App.css";

import MessageBox from "./components/messagebox";
import ResourceView from "./components/resourceview";
import Tab from "./components/tab";
import useGameState from "./hooks/usegamestate";
import GameLoop from "./logic/gameloop";
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
  }

  const visibleTabs = Object.keys(tabs).filter(
    (key) => gameState.tabs[key as Tabs].acquired
  );

  return (
    <div className="flex flex-col h-full text-xs md:text-base items-stretch">
      <nav className="flex flex-row gap-3 items-stretch flex-shrink-0 overflow-x-auto">
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
        <aside className="p-2 bg-gray-300 min-w-[120px] md:min-w-[160px]">
          <ResourceView />
        </aside>
        <article className="p-4 flex-grow overflow-auto pb-14">
          {CurrentTab}
        </article>
      </div>
      <footer className="fixed md:block bottom-0 right left-0 right-0">
        <MessageBox></MessageBox>
      </footer>
    </div>
  );
}

export default App;
