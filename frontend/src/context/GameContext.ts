import {createContext} from "react";
import {Board} from "../types/Board";
import { Game, NO_GAME_GAMEID } from "../types/Game";
import {Space} from "../types/Space";
import { User } from "../types/User";

export type GameContextType = {
    // Information about games
    games: Game[]
    selectGame: (gameId: number) => Promise<void>,
    unselectGame: () => Promise<void>,
    currentUser : User,
    currentGame : Game,
    deleteGame :  (gameId: number) => Promise<void>,
    loaded : boolean,
    board: Board,
    setCurrentPlayerOnSpace: (space: Space) => Promise<void>,
    switchCurrentPlayer: () => Promise<void>,
    forceViewUpdate : () => void,
    createGame : () => Promise<number>,
    startGame : (gameId: number) => Promise<Boolean>,
    changeGameName : (gameId: number, name: string) => Promise<boolean>,
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
    currentUser: {
        userId: 0,
        userName: "Not logged in!",
        currentGame: NO_GAME_GAMEID
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