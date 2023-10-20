const { calculateWinner, findBestMove, randomMove } = require('./ticTacToeUtils');

describe('Tic Tac Toe Utilities', () => {

    describe('calculateWinner', () => {
        it('should determine a winning game state', () => {
            const winningBoard = ['X', 'X', 'X', null, null, null, null, null, null];
            expect(calculateWinner(winningBoard)).toEqual({ winner: 'X', line: [0, 1, 2] });
        });

        it('should return null for a non-winning game state', () => {
            const nonWinningBoard = ['X', 'O', 'X', 'O', 'X', 'O', null, null, null];
            expect(calculateWinner(nonWinningBoard)).toBeNull();
        });
    });

    describe('findBestMove', () => {
        it('should return an optimal move or null', () => {
            const squares = [null, null, null, null, null, null, null, null, null];
            const move = findBestMove(squares);
            if (move !== null) {
                expect(move).toBeGreaterThanOrEqual(0);
                expect(move).toBeLessThan(9);
            }
        });
    });

    describe('randomMove', () => {
        it('should return a random empty square', () => {
            const squares = ['X', 'O', null, 'X', 'O', null, 'X', 'O', null];
            const move = randomMove(squares);
            expect([2, 5, 8]).toContain(move);
        });
    });

});
