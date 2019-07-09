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
  const [activeTab, setActiveTab] = useState('packs');
  const gameState = useGameState();

  function clickTab(id, type) {
    setActiveTab(id);
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
            <Tab name="Packs" active={activeTab === 'packs'} onClick={() => clickTab('packs', <PacksTab />)} item={gameState.packstab}></Tab>
            <Tab name="Trade binder"  active={activeTab === 'trade'} onClick={() => clickTab('trade', <TradebinderTab />)} item={gameState.tradebindertab}></Tab>
            <Tab name="Tournaments" item={gameState.tournamentstab}></Tab>
            <Tab name="Skills"  active={activeTab === 'skills'} onClick={() => clickTab('skills', <SkillsTab />)} item={gameState.skillstab}></Tab>
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
