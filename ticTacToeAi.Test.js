const { handler } = require("../ticTacToeAI");

describe("Tic Tac Toe AI", () => {
    it("should return a move when provided with a board state", async () => {
        const event = {
            httpMethod: "POST",
            body: JSON.stringify({ squares: Array(9).fill(null) }),
        };

        const response = await handler(event);
        expect(response.statusCode).toBe(200);

        const move = JSON.parse(response.body).move;
        expect(typeof move).toBe("number");
        expect(move).toBeGreaterThanOrEqual(0);
        expect(move).toBeLessThan(9);
    });

    // - AI should block a winning move by the player
    // - AI should make a winning move if available
    // ... etc.
});
