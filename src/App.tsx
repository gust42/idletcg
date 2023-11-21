import { useState } from "react";
import "./App.css";

import GameLoop from "./logic/gameloop";
import MessageBox from "./components/messagebox";
import ResourceView from "./components/resourceview";
import useGameState from "./hooks/usegamestate";
import Tab from "./components/tab";
import PacksTab from "./pages/packs/packstab";
import TradebinderTab from "./pages/tradebinder/tradebindertab";
import SkillsTab from "./pages/skills/skillstab";

const gameLoop = GameLoop.getInstance();
gameLoop.start();
function App() {
  const [currentTab, setCurrentTab] = useState(<PacksTab />);
  const [activeTab, setActiveTab] = useState("packs");
  const gameState = useGameState();

  function clickTab(id: string, type: JSX.Element) {
    setActiveTab(id);
    setCurrentTab(type);
  }

  return (
    <div className="App">
      <header className="App-header">IDLE TCG</header>
      <div className="content">
        <aside>
          <ResourceView />
        </aside>
        <section>
          <nav>
            <Tab
              name="Packs"
              active={activeTab === "packs"}
              onClick={() => clickTab("packs", <PacksTab />)}
              item={gameState.tabs.packstab}
            ></Tab>
            <Tab
              name="Trade binder"
              active={activeTab === "trade"}
              onClick={() => clickTab("trade", <TradebinderTab />)}
              item={gameState.tabs.tradebindertab}
            ></Tab>
            <Tab
              name="Tournaments"
              onClick={() => {}}
              active={false}
              item={gameState.tabs.tournamentstab}
            ></Tab>
            <Tab
              name="Skills"
              active={activeTab === "skills"}
              onClick={() => clickTab("skills", <SkillsTab />)}
              item={gameState.tabs.skillstab}
            ></Tab>
          </nav>
          {currentTab}
        </section>
      </div>
      <footer>
        <MessageBox></MessageBox>
      </footer>
    </div>
  );
}

export default App;
