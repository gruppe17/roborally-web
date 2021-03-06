/**
 * @jest-environment node
 */

import GameApi from "./GameApi"
import { Game } from '../types/Game';
import "jest-extended";

describe('creating and removing games', () => {
    let game: Game;
    test('should create a game and receive it back', async () => {
        const gameId = (await GameApi.createGame()).data;
        game = (await GameApi.getGame(gameId)).data;
        expect(game).not.toBeNull()
        expect(game.gameId).not.toBeNull()
        expect(game.started).toBeFalsy()
        expect(game.users).toBeEmpty();
        expect(game.name).toBeString()
    })

    test('should remove a game and receive a success', async () => {
        const result = (await GameApi.removeGame(game.gameId)).data
        expect(result).toBe(true);
    })

})


describe('Games', () => {
    let game: Game
    beforeEach(async () => {
        const gameId = (await GameApi.createGame()).data;
        game = (await GameApi.getGame(gameId)).data;
    })
    test('should get games from backend', async () => {
        // getGames has already been tested in the previous test.
        const result = await GameApi.getGames()
        let foundGame = false;
        result.data.forEach(resultGame => {
            if (resultGame.gameId === game.gameId) {
                foundGame = true;
            }
        });
        expect(foundGame).toBe(true);

    })

    test('should change the game name', async () => {
        expect(game.name).not.toBe("Awesome sauce")
        const result = (await GameApi.editGameName(game.gameId, "Awesome sauce")).data
        game = (await GameApi.getGame(game.gameId)).data;
        expect(result).toBeTrue()
        expect(game.name).toBe("Awesome sauce")
    })

    afterEach(() => {
        GameApi.removeGame(game.gameId);
    })
})