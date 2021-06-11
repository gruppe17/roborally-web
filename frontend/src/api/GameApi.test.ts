import GameApi from "./GameApi"
import { Game } from '../types/Game';


describe('creating and removing games', () => {
    let game: Game;
    test('should create a game and receive it back', async () => {
        const newGame = await GameApi.createGame();
        game = newGame;
        expect(newGame).not.toBeNull()
        expect(newGame.gameId).not.toBeNull()
        expect(newGame.started).toBeFalsy()
        expect(newGame.users).toBeNull();
        expect(newGame.name).toBeNull()
    })

    test('should remove a game and receive a success', async () => {
        const result = await GameApi.removeGame(game.gameId)
        expect(result).toBe(true);
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