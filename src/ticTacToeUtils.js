// Calculates and returns the winner (or null if no winner)
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

// Determines the best move for the AI
function findBestMove(squares) {
    for (let i = 0; i < squares.length; i++) {
        if (!squares[i]) {
            squares[i] = 'O';
            if (calculateWinner(squares)) return i; // Winning move
            squares[i] = 'X';
            if (calculateWinner(squares)) return i; // Blocking move
            squares[i] = null;
        }
    }
    return null;
}

// Picks a random empty square for the AI's move
function randomMove(squares) {
    const emptySquares = squares.map((square, index) => square ? null : index).filter(index => index !== null);
    if (emptySquares.length === 0) return null;
    return emptySquares[Math.floor(Math.random() * emptySquares.length)];
}

module.exports = {
    calculateWinner,
    findBestMove,
    randomMove
};
