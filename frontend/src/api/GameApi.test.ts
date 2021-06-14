/**
 * @jest-environment node
 */

import GameApi from "./GameApi"
import { Game } from '../types/Game';
import { User } from '../types/User';



describe('creating and removing games', () => {
    let game: Game;
    test('should create a game and receive it back', async () => {
        const gameId = (await GameApi.createGame()).data;
        game = (await GameApi.getGame(gameId)).data;
        expect(game).not.toBeNull()
        expect(game.gameId).not.toBeNull()
        expect(game.started).toBeFalsy()
        expect(game.users).toBeNull();
        expect(game.name).toBeNull()
    })

    test('should remove a game and receive a success', async () => {
        const result = (await GameApi.removeGame(game.gameId)).data
        expect(result).toBe(true);
    })

})
describe('creating and removing users', () => {
    let user: User;
    test('should create a user and receive its id', async () => {
        const userId = await GameApi.createUser();
        expect(userId).not.toBeNull;
        expect(userId.data).toBe(Number);
        user = (await GameApi.getUser(userId.data)).data;
        expect(user.userName).not.toBe
        expect(user.userName).toBe(userId.data);
    })

    test('should remove a game and receive a success', async () => {
        const result = await GameApi.removeUser(user.userId)
        expect(result).toBe(true);

        const allUsers = await GameApi.getAllUsers();
        //... check if contained  
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

    afterEach(() => {
        GameApi.removeGame(game.gameId);
    })
})