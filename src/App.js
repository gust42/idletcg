import React from 'react';
import MessageHandler from './logic/messagehandler';

import useGameState from './hooks/usegamestate';
import Button from './components/button';
import GameLoop from './logic/gameloop';
import './App.css';

const gameLoop = GameLoop.getInstance();
gameLoop.start();
function App() {
  const gameState = useGameState();
  console.log(gameState);
  function openPack() {
    MessageHandler.recieveMessage('openpack');
  }

  return (
    <div className="App">
      <header className="App-header">
       IDLE TCG
      </header>
      <aside>
        Cards: { gameState.cards }
      </aside>
      <section>
        <Button text="Open pack" click={openPack}></Button>
      </section>
    </div>
  );
}

export default App;
