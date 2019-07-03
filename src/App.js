import React from 'react';
import MessageHandler from './logic/messagehandler';

import Button from './components/button';
import GameLoop from './logic/gameloop';
import './App.css';
import MessageBox from './components/messagebox';
import ResourceView from './components/resourceview';
import useGameRule from './hooks/usegamerule';

const gameLoop = GameLoop.getInstance();
gameLoop.start();
function App() {
  const packCostRule = useGameRule('PackCost');
  const goodSellValueRule = useGameRule('GoodCardSellValue');
  const badSellValueRule = useGameRule('BadCardSellValue');
  const metaSellValueRule = useGameRule('MetaCardSellValue');

  function openPack() {
    MessageHandler.recieveMessage('openpack', 1);
  }

  function sellBadCards() {
    MessageHandler.recieveMessage('sellbadcards', 1);
  }

  function sellGoodCards() {
    MessageHandler.recieveMessage('sellgoodcards', 1);
  }

  function sellMetaCards() {
    MessageHandler.recieveMessage('sellmetacards', 1);
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
            <div className="tab active">Packs</div>
            <div className="tab">Trade binder</div>
            <div className="tab">Tournaments</div>
            <div className="tab">Skills</div>
          </nav>
          <article>
          <Button text="Open pack" click={openPack} cost={packCostRule.value}></Button>
          <Button text="Sell bad card" click={sellBadCards} cost={badSellValueRule.value}></Button>
          <Button text="Sell good card" click={sellGoodCards} cost={goodSellValueRule.value}></Button>
          <Button text="Sell meta card" click={sellMetaCards} cost={metaSellValueRule.value}></Button>
          </article>
        </section>
      </div>
      <footer>
        <MessageBox></MessageBox>
      </footer>
    </div>
  );
}

export default App;
