import {createContext} from "react";
import { Game, NO_GAME_GAME, NO_GAME_GAMEID } from '../types/Game';


export type GameContextType = {
    // Information about games
    games: Game[],
    currentGame : Game,
    // Actions on information about games
    selectGame: (gameId: number) => Promise<void>,
    unselectGame: () => Promise<void>,
    createGame : () => Promise<number>,
    deleteGame :  (gameId: number) => Promise<void>,
    startGame : (gameId: number) => Promise<Boolean>,
    changeGameName : (gameId: number, name: string) => Promise<boolean>,
    // Nothing to do with games
    forceViewUpdate : () => Promise<void>,
}
//Define a new context of type GameContextType
//Below we define the "default" values which are set upon initialization of the context

const GameContext = createContext<GameContextType>({
    games: [],
    currentGame: NO_GAME_GAME,
    selectGame: async () => {},
    unselectGame: async () => {},
    deleteGame: async (gameId : number) => {},
    forceViewUpdate: async () => {},
    createGame: async () => {return NO_GAME_GAMEID},
    startGame: async () => { return false},
    changeGameName: async (gameId: number, name: string) => {return false},
});

export default GameContext