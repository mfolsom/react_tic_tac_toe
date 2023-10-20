const { Handler } = require("@netlify/functions");
const { calculateWinner, randomMove } = require("../../src/ticTacToeUtils.js");

const findBestMove = (squares) => {
    // Clone the squares array to test potential moves
    const testSquares = [...squares];

    // Check for AI's winning move
    for (let i = 0; i < squares.length; i++) {
        if (!testSquares[i]) {
            testSquares[i] = "O"; // Assuming AI is 'O'
            if (calculateWinner(testSquares) === "O") {
                return i;
            }
            testSquares[i] = null;
        }
    }

    // Check to block the player's winning move
    for (let i = 0; i < squares.length; i++) {
        if (!testSquares[i]) {
            testSquares[i] = "X"; // Assuming the player is 'X'
            if (calculateWinner(testSquares) === "X") {
                return i;
            }
            testSquares[i] = null;
        }
    }

    // If no winning/blocking move, return a random move
    return randomMove(squares);
};

const handler = async (event, context) => {
    if (event.httpMethod !== "POST") {
        return { statusCode: 405, body: "Method Not Allowed" };
    }

    try {
        const requestBody = JSON.parse(event.body);
        const squares = requestBody.squares;

        const move = findBestMove(squares);

        return {
            statusCode: 200,
            body: JSON.stringify({ move: move }),
        };
    } catch (error) {
        return {
            statusCode: 400,
            body: JSON.stringify({ error: "Invalid request" }),
        };
    }
};

module.exports = { handler };
