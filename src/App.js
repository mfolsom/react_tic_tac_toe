import React, { useState } from 'react';
import './App.css';
import { calculateWinner } from './ticTacToeUtils';

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
}

function Board() {
  const [isXNext, setIsXNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winningInfo = calculateWinner(squares);
  const winner = winningInfo?.winner || null;
  const winningLine = winningInfo?.line ?? [];

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (squares.every(square => square)) {
    status = 'Draw!';
  } else {
    status = `Next player: ${isXNext ? 'X' : 'O'}`;
  }

  function handleClick(index) {
    if (squares[index] || winner) return;

    const newSquares = squares.slice();
    newSquares[index] = isXNext ? 'X' : 'O';
    setSquares(newSquares);
    setIsXNext(!isXNext);
  }

  function resetBoard() {
    setSquares(Array(9).fill(null));
    setIsXNext(true);
  }

  return (
    <div>
      <div className="status">{status}</div>
      <div className="board">
        {squares.map((square, index) => (
          <button
            key={index}
            className={`square ${square === 'X' ? 'text-green' : square === 'O' ? 'text-orange' : ''} ${winningLine.includes(index) ? 'highlight' : ''}`}
            onClick={() => handleClick(index)}
            data-testid={`square-${index}`}
          >
            {square}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={resetBoard}>Reset</button>
    </div>
  );
}

export default App;
