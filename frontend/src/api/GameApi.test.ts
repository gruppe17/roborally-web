/**
 * @jest-environment node
 */

import GameApi from "./GameApi"
import { Game } from '../types/Game';
import { User } from '../types/User';


describe('Creating, reciving and removing users', () => {
    let user: User;
    test('should create a user and receive its id and name', async () => {
        const userId = (await GameApi.createUser()).data;
        expect(userId).toBe(Number);
        user = (await GameApi.getUser(userId)).data;
        expect(user.userName).toBe(String);
        expect(user.userName).not.toBeEmpty();
        expect(user.userId).toBe(userId);
    })

    test("Getting all users")

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


    afterEach(() => {
        GameApi.removeGame(game.gameId);
    })
})