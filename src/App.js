import React, { useState } from 'react';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Tic Tac Toe</h1>
      <Board />
    </div>
  );
}

function Board() {
  const [startingPlayer, setStartingPlayer] = useState('X');
  const [isXNext, setIsXNext] = useState(true);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const winningInfo = calculateWinner(squares);
  const winner = winningInfo ? winningInfo.winner : null;
  const winningLine = winningInfo ? winningInfo.line : [];

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
            data-testid={`square-${index}`} // Add data-testid attribute
          >
            {square}
          </button>
        ))}
      </div>
      <button className="reset-button" onClick={resetBoard}>Reset</button>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: lines[i] };
    }
  }
  return null;
}




export default App;
