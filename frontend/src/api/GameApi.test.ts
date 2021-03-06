/**
 * @jest-environment node
 */

import GameApi from "./GameApi"
import { Game } from '../types/Game';
import { User } from '../types/User';
import "jest-extended";


describe('Creating and removing users', () => {
    let user: User;
    let initialUserList: User[];
    beforeEach(async () => {
        initialUserList = (await GameApi.getAllUsers()).data;
    })

    test('should create a user and receive its id and name', async () => {
        const userId = (await GameApi.createUser()).data;
        expect(userId).toBeNumber();

        user = (await GameApi.getUser(userId)).data;
        expect(user.userName).toBeString();
        expect(user.userName).not.toBeEmpty();
        expect(user.userId).toBe(userId);

        const userList = (await GameApi.getAllUsers()).data

        expect(userList).toBeArrayOfSize(initialUserList.length + 1)
    })

    test('should remove a user and receive a success', async () => {
        const initialUserList = (await GameApi.getAllUsers()).data

        const result = (await GameApi.removeUser(user.userId)).data
        expect(result).toBe(true);

        const allUsers = (await GameApi.getAllUsers()).data;
        expect(allUsers).toBeArrayOfSize(initialUserList.length - 1);
    })

    afterAll(async () => {
        GameApi.removeUser(user.userId)
    })

})

describe('User', () => {
    let game: Game
    let newUsersIds: number[]

    beforeAll(async () => {
        newUsersIds = []
        for (let i = 0; i < 10; i++) {
            newUsersIds.push((await GameApi.createUser()).data);
        }
    })

    beforeEach(async () => {
        const gameId = (await GameApi.createGame()).data;
        game = (await GameApi.getGame(gameId)).data;
        await GameApi.createBoard(gameId, "Default Board", 8, 8)
    })


    test("Getting all users", async () => {
        const allUsers = (await GameApi.getAllUsers()).data
        newUsersIds.forEach(async userId => {
            let isFound = false;
            for (let i = 0; i < allUsers.length; i++) {
                if (allUsers[i].userId === userId) {
                    isFound = true
                    break;
                }
            }
            expect(isFound).toBeTrue();
        });
    })

    test("User join empty game", async () => {
        expect((await GameApi.joinGame(game.gameId, newUsersIds[0])).data).toBeTrue();
        game = (await GameApi.getGame(game.gameId)).data
        expect(game.users).toBeArrayOfSize(1);
        const board = (await GameApi.getBoard(game.gameId)).data.playerDtos;
        expect(board).toBeArrayOfSize(1);
    })

    test("User join multiple games", async () => {
        expect((await GameApi.joinGame(game.gameId, newUsersIds[0])).data).toBeTrue();
        const game2Id = (await GameApi.createGame()).data;
        expect((await GameApi.joinGame(game2Id, newUsersIds[0])).data).toBeFalse();
    })

    test("User join full game", async () => {
        for (let i = 0; i < newUsersIds.length; i++) {
            let joined = (await GameApi.joinGame(game.gameId, newUsersIds[i])).data;
            if (i >= 6) joined = !joined;
            expect(joined).toBeTrue();
        }
    })

    test("User leave otherwise empty game", async () => {
        GameApi.joinGame(game.gameId, newUsersIds[0]);
        expect((await GameApi.getGame(game.gameId)).data.users).not.toBeEmpty();
        expect((await GameApi.leaveGame(game.gameId, newUsersIds[0])).data).toBeTrue();
        expect((await GameApi.getGame(game.gameId)).data.users).toBeArrayOfSize(0);
    })

    test("User leave full game, other user joins", async () => {
        for (let i = 0; i < 6; i++) {
            await GameApi.joinGame(game.gameId, newUsersIds[i])
        }
        expect((await GameApi.leaveGame(game.gameId, newUsersIds[0])).data).toBeTrue();
        expect((await GameApi.joinGame(game.gameId, newUsersIds[7])).data).toBeTrue();
    })


    afterEach(() => {
        GameApi.removeGame(game.gameId);
    })

    afterAll(async () => {
        newUsersIds.forEach(userId => {
            GameApi.removeUser(userId);
        });
    })
})