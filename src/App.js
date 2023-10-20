import React, { useState } from 'react';
import './App.css';
import { calculateWinner } from './ticTacToeUtils';

function App() {
  // No need for two-player mode state
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

  async function makeAIMove(newSquares) {
    try {
      const response = await fetch("/.netlify/functions/ticTacToeAi", {
        method: "POST",
        body: JSON.stringify({ squares: newSquares }),
      });

      if (response.ok) {
        const data = await response.json();
        const aiMove = data.move;

        // Apply the AI's move to the board
        if (aiMove !== null) {
          newSquares[aiMove] = "O"; // Assuming AI is 'O'
          setSquares(newSquares);
          setIsXNext(true);
        }
      }
    } catch (error) {
      console.error("Error making AI move:", error);
    }
  }

  function handleClick(index) {
    if (squares[index] || winner || !isXNext) return;

    const newSquares = squares.slice();
    newSquares[index] = "X"; // Assuming the player is 'X'
    setSquares(newSquares);
    setIsXNext(false); // Now it's AI's turn

    // Trigger AI move
    makeAIMove(newSquares);
  }

  function resetBoard() {
    // Reset the game board
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
            disabled={!isXNext} // Disable during AI's turn
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
