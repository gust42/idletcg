import React, { useState } from 'react';
import GameLoop from './logic/gameloop';
import './App.css';
import MessageBox from './components/messagebox';
import ResourceView from './components/resourceview';
import useGameState from './hooks/usegamestate';
import Tab from './components/tab';
import PacksTab from './components/packstab';
import TradebinderTab from './pages/tradebinder/tradebindertab';
import SkillsTab from './components/skillstab';

const gameLoop = GameLoop.getInstance();
gameLoop.start();
function App() {
  const [currentTab, setCurrentTab] = useState(<PacksTab />);
  const gameState = useGameState();

  function clickTab(type) {
    setCurrentTab(type);
  }

  return (
    <div className="App">
      <header className="App-header">
       IDLE TCG
      </header>
      <div className="content">
        <aside>
          <ResourceView></ResourceView>
        </aside>
        <section>
          <nav>
            <Tab name="Packs" onClick={() => clickTab(<PacksTab />)} item={gameState.packstab}></Tab>
            <Tab name="Trade binder" onClick={() => clickTab(<TradebinderTab />)} item={gameState.tradebindertab}></Tab>
            <Tab name="Tournaments" item={gameState.tournamentstab}></Tab>
            <Tab name="Skills" onClick={() => clickTab(<SkillsTab />)} item={gameState.skillstab}></Tab>
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
