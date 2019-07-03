import React from 'react';
import MessageHandler from './logic/messagehandler';

import Button from './components/button';
import GameLoop from './logic/gameloop';
import './App.css';
import MessageBox from './components/messagebox';
import ResourceView from './components/resourceview';

const gameLoop = GameLoop.getInstance();
gameLoop.start();
function App() {
  function openPack() {
    MessageHandler.recieveMessage('openpack');
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
          <nav><div className="tab">Packs</div></nav>
          <article>
          <Button text="Open pack" click={openPack}></Button>
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
