import {createContext} from "react";
import {Board} from "../types/Board";
import { Game, NO_GAME_GAMEID } from "../types/Game";
import {Space} from "../types/Space";


export type GameContextType = {
    // Information about games
    games: Game[],
    currentGame : Game,
    selectGame: (gameId: number) => Promise<void>,
    unselectGame: () => Promise<void>,
    createGame : () => Promise<number>,
    deleteGame :  (gameId: number) => Promise<void>,
    startGame : (gameId: number) => Promise<Boolean>,
    changeGameName : (gameId: number, name: string) => Promise<boolean>,
    board: Board,
    loaded : boolean,
    setCurrentPlayerOnSpace: (space: Space) => Promise<void>,
    switchCurrentPlayer: () => Promise<void>,
    forceViewUpdate : () => void,
}
//Define a new context of type GameContextType
//Below we define the "default" values which are set upon initialization of the context

const GameContext = createContext<GameContextType>({
    games: [],
    currentGame: {
        gameId: NO_GAME_GAMEID,
        name: "No game loaded",
        started: false,
        users: []
    },
    selectGame: async () => {},
    unselectGame: async () => {},
    deleteGame: async (gameId : number) => {},
    loaded : false,
    board: {
        playerDtos: [],
        spaceDtos: [],
        gameId: NO_GAME_GAMEID,
        boardName: "",
        currentPlayerDto: undefined,
        height: 0,
        width: 0
    },
    setCurrentPlayerOnSpace: async () => {
    },
    switchCurrentPlayer: async () => {
    },
    forceViewUpdate: () => {},
    createGame: async () => {return -1},
    startGame: async () => { return false},
    changeGameName: async (gameId: number, name: string) => {return false},
});

export default GameContext