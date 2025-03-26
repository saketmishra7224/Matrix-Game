import React from 'react';
import './App.css';
import MatrixGame from './components/MatrixGame';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Matrix Game</h1>
        <MatrixGame />
      </header>
    </div>
  );
}

export default App;
