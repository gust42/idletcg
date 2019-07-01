import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [cards, setCards] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
       IDLE TCG
      </header>
      <aside>
        Cards: { cards }
      </aside>
      <section>
        <div className="button" onClick={() => setCards(cards + 1)}>Buy pack</div>
      </section>
    </div>
  );
}

export default App;
