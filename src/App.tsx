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

  const visibleTabs = Object.keys(gameState.tabs).filter(
    (key) => gameState.tabs[key as Tabs].acquired
  );

  return (
    <div className="App">
      <header className="App-header">IDLE TCG</header>
      <div className="content">
        <aside>
          <ResourceView />
        </aside>
        <section>
          <nav>
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
          {CurrentTab}
        </section>
      </div>
      <footer>
        <MessageBox></MessageBox>
      </footer>
    </div>
  );
}

export default App;
