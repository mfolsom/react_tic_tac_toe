const { handler } = require("../functions/ticTacToeAi.js");

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

});

// tests/ticTacToeAI.test.js

// import { handler } from "../functions/ticTacToeAi.js"; // Adjust the import path as needed

// describe("Tic-Tac-Toe AI Function", () => {
//     it("should return a valid move", async () => {
//         const event = {
//             httpMethod: "POST",
//             body: JSON.stringify({ squares: ["X", null, null, null, "O", null, null, null, null] }),
//         };

//         const context = {};

//         const response = await handler(event, context);
//         const responseBody = JSON.parse(response.body);

//         expect(response.statusCode).toBe(200);
//         expect(responseBody.move).toBeGreaterThanOrEqual(0);
//         expect(responseBody.move).toBeLessThan(9);
//     });
// });

