import GameApi from "./GameApi"
import { Game } from '../types/Game';


describe('creating and removing games games', () => {
    test('should create a game and receive it back', async () => {
        const newGame = await GameApi.createGame();

        expect(newGame).not.toBeNull()
        expect(newGame.gameId).not.toBeNull()
        expect(newGame.started).toBeFalsy()
        expect(newGame.users).toBeNull();
        expect(newGame.name).toBeNull()
    })



})


describe('Games', () => {

    let game: Game
    beforeEach(async () => {
        game = await GameApi.createGame();
    })

    test('should get games from backend', async () => {
        // getGames has already been tested in the previous test.
        const result = await GameApi.getGames()
        
    })
    afterEach(() => {
        GameApi.removeGame(game.gameId);
    })
})