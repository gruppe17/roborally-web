/**
 * @jest-environment node
 */

import GameApi from "./GameApi"
import { Game } from '../types/Game';
import { User } from '../types/User';


describe('Creating and removing users', () => {
    let user: User;
    test('should create a user and receive its id and name', async () => {
        const userId = (await GameApi.createUser()).data;
        expect(userId).toBe(Number);
        user = (await GameApi.getUser(userId)).data;
        expect(user.userName).toBe(String);
        expect(user.userName).not.toBeEmpty();
        expect(user.userId).toBe(userId);
    })

    test('should remove a user and receive a success', async () => {
        const initialUserList = (await GameApi.getAllUsers()).data
        expect(initialUserList.length).toBe(1);

        const result = (await GameApi.removeUser(user.userId)).data
        expect(result).toBe(true);

        const allUsers = (await GameApi.getAllUsers()).data;
        expect(allUsers.length).toBe(0);
    })

})

describe('Games', () => {
    let game: Game
    beforeEach(async () => {
        const gameId = (await GameApi.createGame()).data;
        game = (await GameApi.getGame(gameId)).data;
    })


    test("Getting all users" , async () => {
        const allUsers = await GameApi.getAllUsers
    })

    afterEach(() => {
        GameApi.removeGame(game.gameId);
    })
})