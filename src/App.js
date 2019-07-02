import React, { useState } from 'react';
import MessageHandler from './logic/messagehandler';
import Button from './components/button';
import './App.css';

function App() {

  function openPack() {
    console.log('open pack clicked');
    MessageHandler.recieveMessage('openpack');
  }

  return (
    <div className="App">
      <header className="App-header">
       IDLE TCG
      </header>
      <aside>
        {/* Cards: { cards } */}
      </aside>
      <section>
        <Button text="Open pack" click={openPack}></Button>
      </section>
    </div>
  );
}

export default App;
